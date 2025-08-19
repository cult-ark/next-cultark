import { Metadata } from 'next';
import CaseStudiesPageClient from './CaseStudiesPageClient';

export const metadata: Metadata = {
    title: 'Case Studies & Reports - CULTARK',
    description: 'Explore CULTARK\'s comprehensive collection of case studies and industry reports. Download detailed analyses of successful campaigns, AI implementations, and digital transformation strategies.',
    keywords: 'case studies, marketing reports, AI case studies, digital marketing reports, campaign analysis, business transformation',
    openGraph: {
        title: 'Case Studies & Reports - CULTARK',
        description: 'Explore our comprehensive collection of case studies and industry reports including AI implementations, campaign analyses, and digital transformation strategies.',
        images: [
            {
                url: 'https://backup.cultark.net/images/og-case-studies.jpg',
                width: 1200,
                height: 630,
                alt: 'CULTARK Case Studies & Reports',
            },
        ],
        url: 'https://backup.cultark.net/case-studies',
        type: 'website',
        siteName: 'CULTARK',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Case Studies & Reports - CULTARK',
        description: 'Explore our comprehensive collection of case studies and industry reports. Download detailed analyses and digital transformation strategies.',
        images: ['https://backup.cultark.net/images/og-case-studies.jpg'],
        site: '@cultark',
    },
};

export default function CaseStudiesPage() {
    return <CaseStudiesPageClient />;
}