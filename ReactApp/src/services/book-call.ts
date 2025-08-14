import axios from 'axios';
import moment from 'moment';
import { ReservationResponse } from '../types/reserve_response.type';

// **IMPORTANT**: Replace with your actual Google Calendar API Key
// **IMPORTANT**: Replace with your actual Google Calendar API Key
// It's recommended to use environment variables for sensitive information.
const GOOGLE_CALENDAR_API_KEY = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY;
const GOOGLE_API_URL = 'https://www.googleapis.com/calendar/v3';

export type reserveDTO = {
  Name: string;
  Email: string;
  Phone: string;
  Notes: string;
  start_date: string;
  end_date: string;
  calendar_id: string;
};

// --- No changes needed in reserveSlot ---
export const reserveSlot = async ({
  Name,
  Email,
  Phone,
  Notes,
  start_date,
  end_date,
  calendar_id,
}: reserveDTO): Promise<ReservationResponse> => {
  const event = {
    summary: `Meeting with ${Name}`,
    location: Notes,
    description: `Phone: ${Phone}\nNotes: ${Notes}`,
    start: {
      dateTime: moment(start_date).toISOString(),
      timeZone: 'Africa/Cairo',
    },
    end: {
      dateTime: moment(end_date).toISOString(),
      timeZone: 'Africa/Cairo',
    },
    attendees: [{ email: Email }],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 10 },
      ],
    },
  };

  try {
    // This POST request is for creating the event
    const res = await axios.post(
      `${GOOGLE_API_URL}/calendars/${calendar_id}/events?key=${GOOGLE_CALENDAR_API_KEY}`,
      event,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    return {
      error: '',
      success: true,
      message: 'Appointment created successfully.',
      data: {
        id: res.data.id,
        appointment_type_id: '',
        rescheduled_from_appointment_id: '0',
        customer_information: {
          Name,
          Email,
          Phone,
          Notes,
        },
        start_date: res.data.start.dateTime,
        end_date: res.data.end.dateTime,
        gcal: { customer: res.data.htmlLink },
      },
    } as ReservationResponse;
  } catch (error) {
    console.error('Error creating event:', error);
    throw new Error('Failed to create appointment.');
  }
};

// --- No changes needed in formatDate or getNextDay ---
export function formatDate(date: Date) {
  date.setHours(2, 0, 0, 0);
  return date.toISOString().split('T')[0];
}

export function getNextDay(date: Date) {
  const tomorrow = new Date(date);
  tomorrow.setHours(2, 0, 0, 0);
  tomorrow.setDate(date.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
}

// ====================================================================
// ## THIS IS THE CORRECTED FUNCTION ##
// ====================================================================
export async function getAvailableSlots(
  calendar_id: string,
  startDateMin: string,
  startDateMax: string
) {
  // The URL for the freeBusy endpoint. Note there is NO key in the URL itself.
  const url = `${GOOGLE_API_URL}/freeBusy`;


  const requestBody = {
    timeMin: moment(startDateMin).startOf('day').toISOString(),
    timeMax: moment(startDateMax).endOf('day').toISOString(),
    timeZone: 'Africa/Cairo',
    items: [{ id: calendar_id }],
  };

  try {
    // **THE FIX**: We make a POST request.
    // The API key is sent as a `params` object with axios, which correctly
    // appends it to the URL for a POST request.
    const response = await axios.post(url, requestBody, {
      params: {
        key: GOOGLE_CALENDAR_API_KEY,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Check if the calendar exists in the response
    if (response.data.calendars && response.data.calendars[calendar_id]) {
      const busySlots = response.data.calendars[calendar_id].busy;
      return calculateAvailableSlots(
        moment(startDateMin).startOf('day'),
        moment(startDateMax).endOf('day'),
        busySlots
      );
    } else {
      console.error('Calendar not found or no free/busy information available.');
      return [];
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Error fetching free/busy slots:', error.response.data);
      // You could return a more specific error message or throw a custom error
      throw new Error(`Failed to fetch slots: ${error.response.data.error.message || error.message}`);
    } else {
      console.error('Error fetching free/busy slots:', error);
      throw new Error('Failed to fetch slots due to an unknown error.');
    }
  }
}

// --- No changes needed in calculateAvailableSlots ---
function calculateAvailableSlots(
  startOfDay: moment.Moment,
  endOfDay: moment.Moment,
  busySlots: { start: string; end: string }[]
): { start_date: string }[] {
  const availableSlots: { start_date: string }[] = [];
  const meetingDuration = 30;
  let currentTime = startOfDay.clone().hour(9);
  const endOfWorkDay = endOfDay.clone().hour(17);

  while (currentTime.isBefore(endOfWorkDay)) {
    const slotEndTime = currentTime.clone().add(meetingDuration, 'minutes');
    let isBusy = false;

    for (const busy of busySlots) {
      const busyStart = moment(busy.start);
      const busyEnd = moment(busy.end);
      if (
        currentTime.isBetween(busyStart, busyEnd, undefined, '[)') ||
        slotEndTime.isBetween(busyStart, busyEnd, undefined, '(]') ||
        (currentTime.isSameOrBefore(busyStart) && slotEndTime.isSameOrAfter(busyEnd))
      ) {
        isBusy = true;
        break;
      }
    }

    if (!isBusy) {
      availableSlots.push({ start_date: currentTime.toISOString() });
    }
    currentTime.add(meetingDuration, 'minutes');
  }
  return availableSlots;
}