import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '404 - Page Not Found | CULTARK',
    description: 'The page you are looking for could not be found. Return to CULTARK homepage to explore our performance marketing services.',
    robots: {
        index: false,
        follow: false,
    },
};

export default function NotFound() {
    return (
        <div className='max-w-[110rem] px-10 min-h-screen mx-auto space-y-3 mb-10 flex flex-col items-center justify-center text-gray-400'>
            <h2 className="text-6xl font-bold mb-4">404</h2>
            <h3 className="text-2xl font-semibold mb-2">Page Not Found</h3>
            <p className="mb-4">Could not find the requested resource.</p>
            <Link
                href="/"
                className="inline-block bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
                Return Home
            </Link>
        </div>
    );
}