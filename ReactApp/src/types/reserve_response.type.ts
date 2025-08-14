export type ReservationResponse = {
  error: string | { code: string; message: string };
  data: {
    id: string;
    appointment_type_id: string;
    rescheduled_from_appointment_id: '0';
    customer_information: {
      Name: string;
      Email: string;
      Phone: string;
      Notes: string;
    };
    start_date: string;
    end_date: string;
    gcal: {
      customer: string;
    };
  };
};
