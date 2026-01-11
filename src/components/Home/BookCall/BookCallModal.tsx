'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DayPicker } from 'react-day-picker';
import { format, parseISO, isSameDay } from 'date-fns';
import { User, Calendar as CalendarIcon, Clock, Loader2, XIcon, ArrowLeft } from 'lucide-react';
import 'react-day-picker/dist/style.css';

// Using environment variable for API URL
// const API_URL = 'http://localhost:8000';
const API_URL = 'https://calendar.cultark.net';

const employees = [
    { name: 'Farah Nabil', email: 'farah.nabil@cultark.com', role: 'Senior Account Manager' },
    { name: 'May Omar', email: 'may.omar@cultark.com', role: 'Senior Account Manager' },
    { name: 'Amira Kadry', email: 'amira.kadry@cultark.com', role: 'Accounts Director' },
    { name: 'Zeina Khaled', email: 'zeina.khaled@cultark.com', role: 'Senior Account Manager' },
];

type Slot = {
    start: string;
    end?: string;
    manager?: string;
    [key: string]: unknown;
};

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
};

export default function BookCallModal({ open, setOpen }: Props) {
    const [selectedEmp, setSelectedEmp] = useState(employees[0]);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [allSlots, setAllSlots] = useState<Slot[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
    const [bookingLoading, setBookingLoading] = useState(false);

    // Form state
    const [clientName, setClientName] = useState('');
    const [clientEmail, setClientEmail] = useState('');
    const [clientPhone, setClientPhone] = useState('');

    const router = useRouter();

    // Handle escape key and body scroll lock
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
            const handleEscape = (e: KeyboardEvent) => {
                if (e.key === 'Escape') setOpen(false);
            };
            document.addEventListener('keydown', handleEscape);
            return () => {
                document.removeEventListener('keydown', handleEscape);
                document.body.style.overflow = 'unset';
            };
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [open, setOpen]);

    // Reset state when modal closes
    useEffect(() => {
        if (!open) {
            setSelectedSlot(null);
            setClientName('');
            setClientEmail('');
        }
    }, [open]);

    // Fetch availability whenever the selected employee changes
    useEffect(() => {
        if (!open) return;

        async function fetchSlots() {
            setLoading(true);
            try {
                const res = await fetch(`${API_URL}/api/availability?employee=${selectedEmp.email}`);
                if (!res.ok) throw new Error('Failed to fetch availability');
                const data: Slot[] = await res.json();
                setAllSlots(data);
                // console.log(data);
            } catch (error) {
                console.error("Error fetching slots:", error);
                setAllSlots([]);
            } finally {
                setLoading(false);
            }
        }
        fetchSlots();
    }, [selectedEmp, open]);

    const dailySlots: Slot[] = allSlots.filter((slot: Slot) =>
        selectedDate ? isSameDay(parseISO(slot.start), selectedDate) : false
    );

    const handleBookingSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedSlot || !clientName || !clientEmail) return;

        setBookingLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/book`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    start: selectedSlot.start,
                    end: selectedSlot.end,
                    manager: selectedSlot.manager,
                    employee: selectedEmp.email,
                    client_name: clientName,
                    client_email: clientEmail,
                    client_phone: clientPhone
                }),
            });

            if (res.ok) {
                const data = await res.json();
                router.push(`/thanks?date=${encodeURIComponent(selectedSlot.start)}&meet=${encodeURIComponent(data.meetLink)}`);
                setOpen(false);
            } else {
                alert('Booking failed. Please try again.');
            }
        } catch (error) {
            console.error('Booking error:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setBookingLoading(false);
        }
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setOpen(false);
        }
    };

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={handleOverlayClick}
        >
            <div className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 bg-gray-50 flex-shrink-0">
                    <div className="flex items-center space-x-3">
                        {selectedSlot && (
                            <button
                                onClick={() => setSelectedSlot(null)}
                                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                                aria-label="Go back"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </button>
                        )}
                        <div className="flex items-center space-x-2">
                            <CalendarIcon className="w-6 h-6 text-cultark-blue" />
                            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                                {selectedSlot ? 'Confirm Booking' : 'Book a Consultation'}
                            </h2>
                        </div>
                    </div>
                    <button
                        onClick={() => setOpen(false)}
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                        aria-label="Close modal"
                    >
                        <XIcon className="w-6 h-6 text-gray-600" />
                    </button>
                </div>

                {/* Content */}
                <div className="overflow-y-auto flex-1 p-6">
                    {!selectedSlot ? (
                        <div className="flex flex-col gap-8">
                            {/* Employee Tabs */}
                            <div className="flex flex-wrap gap-2 bg-gray-50 p-2 rounded-xl">
                                {employees.map((emp) => (
                                    <button
                                        key={emp.email}
                                        onClick={() => setSelectedEmp(emp)}
                                        className={`flex-1 min-w-[200px] py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all ${selectedEmp.email === emp.email ? 'bg-white shadow-md text-blue-600 font-bold' : 'text-gray-500 hover:bg-gray-100'
                                            }`}
                                    >
                                        <User className="w-4 h-4" />
                                        <span className="text-sm">{emp.name}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="grid md:grid-cols-2 gap-12">
                                {/* Calendar */}
                                <div className="flex justify-center bg-gray-50 rounded-2xl p-4">
                                    <DayPicker
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={setSelectedDate}
                                        className="modern-calendar"
                                        disabled={{ before: new Date() }}
                                    />
                                </div>

                                {/* Time Slots */}
                                <div>
                                    <div className="flex items-center gap-2 mb-6 text-gray-800 font-semibold text-lg">
                                        <Clock className="w-5 h-5 text-blue-500" />
                                        <h3>Available Times for {selectedDate ? format(selectedDate, 'PPP') : 'Selected Date'}</h3>
                                    </div>

                                    {loading ? (
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <Loader2 className="animate-spin" /> Checking calendars...
                                        </div>
                                    ) : dailySlots.length > 0 ? (
                                        <div className="grid grid-cols-2 gap-3">
                                            {dailySlots.map((slot: Slot, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setSelectedSlot(slot)}
                                                    className="p-4 border border-gray-200 rounded-xl hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all text-left group"
                                                >
                                                    <span className="block font-medium">{format(parseISO(slot.start), 'p')}</span>
                                                    <span className="text-xs opacity-60 group-hover:opacity-100">30 min session</span>
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-400 italic">No slots found for this date. Try another day.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Booking Form */
                        <div className="max-w-md mx-auto">
                            <div className="bg-blue-50 p-6 rounded-2xl mb-8">
                                <h3 className="font-semibold text-blue-900 mb-2">Appointment Details</h3>
                                <p className="text-blue-700 flex items-center gap-2 mb-1">
                                    <User className="w-4 h-4" /> with {selectedEmp.name}
                                </p>
                                <p className="text-blue-700 flex items-center gap-2">
                                    <Clock className="w-4 h-4" /> {format(parseISO(selectedSlot.start), 'PPP @ p')}
                                </p>
                            </div>

                            <form onSubmit={handleBookingSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        value={clientName}
                                        onChange={(e) => setClientName(e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={clientEmail}
                                        onChange={(e) => setClientEmail(e.target.value)}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cultark-blue focus:border-transparent outline-none transition-all"
                                        placeholder="john@company.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={clientPhone}
                                        onChange={(e) => setClientPhone(e.target.value)}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cultark-blue focus:border-transparent outline-none transition-all"
                                        placeholder="+1 234 567 8900"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={bookingLoading}
                                    className="w-full py-4 bg-cultark-blue text-white font-bold rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                                >
                                    {bookingLoading ? <Loader2 className="animate-spin" /> : 'Confirm Booking'}
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
