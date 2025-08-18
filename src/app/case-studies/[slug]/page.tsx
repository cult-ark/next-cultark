import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pdfDocs } from '@/data/pdfs';
import CaseStudyPageClient from './CaseStudyPageClient';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    return pdfDocs.map((doc) => ({
        slug: doc.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const doc = pdfDocs.find((d) => d.slug === slug);

    if (!doc) {
        return {
            title: 'Document Not Found - CULTARK Case Studies',
            description: 'The requested document could not be found. Browse our collection of case studies and industry reports.',
        };
    }

    return {
        title: `${doc.name} - Case Study & Report | CULTARK`,
        description: `${doc.description} - Download and view this comprehensive case study and analysis from CULTARK's collection of industry reports.`,
        keywords: `${doc.name}, case study, ${doc.slug}, industry report, analysis, CULTARK`,
        openGraph: {
            title: `${doc.name} - Case Study & Report`,
            description: `${doc.description} - Comprehensive case study and analysis from CULTARK's industry reports collection.`,
            images: [
                {
                    url: `https://cultark.com/images/docs/${doc.slug}.jpg`,
                    width: 1200,
                    height: 630,
                    alt: `${doc.name} Case Study`,
                },
            ],
            url: `https://cultark.com/case-studies/${slug}`,
            type: 'article',
            siteName: 'CULTARK',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${doc.name} - Case Study & Report`,
            description: `${doc.description} - Comprehensive case study and analysis from CULTARK's industry reports collection.`,
            images: [`https://cultark.com/images/docs/${doc.slug}.jpg`],
            site: '@cultark',
            creator: '@cultark',
        },
        other: {
            'article:published_time': '2025-01-01T00:00:00Z',
            'article:author': 'CULTARK Research Team',
        },
    };
}

export default async function CaseStudyPage({ params }: Props) {
    const { slug } = await params;
    const doc = pdfDocs.find((d) => d.slug === slug);

    if (!doc) {
        notFound();
    }

    return <CaseStudyPageClient doc={doc} />;
}