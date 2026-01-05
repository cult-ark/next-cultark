'use client';
import { useSearchParams } from 'next/navigation';
import { format, parseISO } from 'date-fns';
import { CheckCircle, Calendar, Video } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

function ThanksContent() {
  const searchParams = useSearchParams();
  const date = searchParams.get('date');
  const meet = searchParams.get('meet');

  console.log(date);

  // Safely format the date, handling invalid or missing dates
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return '---';

    try {
      // Handle case where URL decoding turns '+' into space (e.g. "2026... 02:00")
      const fixedDate = dateString.replace(' ', '+');
      const parsedDate = parseISO(fixedDate);
      // Check if the parsed date is valid
      if (isNaN(parsedDate.getTime())) {
        return '---';
      }
      return format(parsedDate, 'PPPP @ p');
    } catch (error) {
      console.error('Error parsing date:', error);
      return '---';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-lg w-full bg-white p-10 rounded-[40px] shadow-2xl text-center border border-gray-100">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">You're all set!</h1>
        <p className="text-gray-500 text-lg mb-10">Check your inbox for the calendar invitation and meeting details.</p>

        <div className="space-y-4 mb-10">
          <div className="flex items-center gap-5 p-5 bg-gray-50 rounded-3xl text-left">
            <Calendar className="w-7 h-7 text-blue-500" />
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Appointment Date</p>
              <p className="text-lg font-semibold text-gray-800">{formatDate(date)}</p>
            </div>
          </div>
          {meet && (
            <a href={meet} target="_blank" className="flex items-center gap-5 p-5 bg-blue-50 rounded-3xl text-left hover:bg-blue-100 transition-all">
              <Video className="w-7 h-7 text-blue-600" />
              <div>
                <p className="text-xs font-bold text-blue-400 uppercase tracking-widest">Meeting URL</p>
                <p className="text-lg font-semibold text-blue-700">Join Google Meet</p>
              </div>
            </a>
          )}
        </div>
        <Link href="/" className="text-gray-400 hover:text-gray-900 font-medium transition-colors">Return to Homepage</Link>
      </div>
    </div>
  );
}

export default function ThanksPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThanksContent />
    </Suspense>
  );
}
