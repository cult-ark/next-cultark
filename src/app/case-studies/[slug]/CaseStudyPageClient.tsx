'use client';

import Link from 'next/link';
import Script from 'next/script';
import { PdfDoc } from '@/data/pdfs';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { generateCaseStudyStructuredData } from '@/lib/structured-data';
import DynamicPDFViewer from '@/components/common/DynamicPDFViewer';

type Props = {
    doc: PdfDoc;
};

export default function CaseStudyPageClient({ doc }: Props) {

    // Generate structured data for the case study
    const structuredData = generateCaseStudyStructuredData({
        name: doc.name,
        description: doc.description,
        url: `https://backup.cultark.net/case-studies/${doc.slug}`,
        datePublished: '2025-01-01T00:00:00Z',
        author: 'CULTARK Research Team'
    });

    return (
        <>
            <Script
                id={`case-study-structured-data-${doc.slug}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData),
                }}
            />
            <div className="flex flex-col min-h-screen pt-20 lg:pt-28">
                {/* Header Section */}
                <div className="sticky top-20 lg:top-28 z-10 bg-white shadow-sm border-b border-gray-200">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="flex items-center gap-4 min-w-0">
                                <Link
                                    href="/case-studies"
                                    className="flex-shrink-0 inline-flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black/20 transition-colors duration-200 text-sm font-medium"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to Documents
                                </Link>
                                <h1 className="hidden sm:block text-lg lg:text-xl font-semibold truncate text-gray-900">{doc.name}</h1>
                            </div>
                            <div className="sm:hidden text-sm font-medium text-gray-900 truncate">{doc.name}</div>
                        </div>
                    </div>
                </div>

                {/* PDF Viewer Section */}
                <div className="flex-1 bg-gray-50 overflow-hidden">
                    <ErrorBoundary>
                        <DynamicPDFViewer
                            pdfUrl={doc.fileUrl}
                            className="h-[calc(100vh-220px)] lg:h-[calc(100vh-200px)] bg-white border border-gray-200 shadow-sm"
                        />
                    </ErrorBoundary>
                </div>
            </div>
        </>
    );
}