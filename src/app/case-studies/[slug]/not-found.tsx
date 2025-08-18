import Link from 'next/link';
import { Metadata } from 'next';
import { pdfDocs } from '@/data/pdfs';

export const metadata: Metadata = {
    title: 'Document Not Found - CULTARK Case Studies',
    description: 'The requested case study document could not be found. Browse our collection of available case studies and industry reports.',
    robots: {
        index: false,
        follow: false,
    },
};

export default function NotFound() {
    return (
        <div className="container mx-auto px-4 py-8 md:py-12 pt-24 lg:pt-32">
            <div className="max-w-2xl mx-auto text-center">
                <h1 className="mb-4 text-xl md:text-2xl font-bold text-red-600">Document Not Found</h1>
                <p className="mb-4 text-red-600">The requested document could not be found.</p>
                <p className="mb-6 text-gray-600">Available documents: {pdfDocs.map(d => d.slug).join(', ')}</p>
                <div className="flex justify-center">
                    <Link
                        href="/case-studies"
                        className="inline-flex items-center px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Documents
                    </Link>
                </div>
            </div>
        </div>
    );
}