'use client';

import { TriangleAlertIcon } from 'lucide-react';
import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Global error:', error);
    }, [error]);

    return (
        <div className='max-w-[110rem] px-10 min-h-screen mx-auto space-y-3 mb-10 flex flex-col items-center justify-center text-gray-400'>
            <TriangleAlertIcon size={60} />
            <h2 className="text-xl font-semibold mb-2">Something went wrong!</h2>
            <p className="text-red-600 mb-4">{error.message}</p>
            <button
                onClick={reset}
                className="inline-block bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
                Try again
            </button>
        </div>
    );
}