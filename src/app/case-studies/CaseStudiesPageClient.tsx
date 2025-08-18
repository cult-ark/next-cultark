'use client';

import Link from 'next/link';
import { pdfDocs } from '@/data/pdfs';

export default function CaseStudiesPageClient() {
    return (
        <div className="container mx-auto px-4 pt-24 lg:pt-32 pb-8">
            <h1 className="text-2xl md:text-3xl font-semibold mb-6">Documents</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {pdfDocs.map((doc) => {
                    const thumb = `/images/docs/${doc.slug}.jpg`;
                    return (
                        <div key={doc.slug} className="rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col">
                            <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                                <img
                                    src={thumb}
                                    alt={`${doc.name} thumbnail`}
                                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-200"
                                    onError={(e) => {
                                        (e.currentTarget as HTMLImageElement).src = '/images/docs/placeholder.svg';
                                    }}
                                />
                            </div>
                            <div className="p-4 flex-1 flex flex-col">
                                <h2 className="text-lg font-medium mb-2 line-clamp-2">{doc.name}</h2>
                                <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">{doc.description}</p>
                                <div className="mt-auto">
                                    <Link
                                        href={`/case-studies/${doc.slug}`}
                                        className="inline-flex items-center justify-center rounded-md bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black/20 transition-colors duration-200 w-full"
                                    >
                                        Open PDF
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}