import { Metadata } from 'next';
import ReportPageClient from './ReportPageClient';

export const metadata: Metadata = {
    title: 'AI Industry Report 2025 - Comprehensive AI Trends Analysis | CULTARK',
    description: 'Download our comprehensive AI Industry Report 2025 exploring the latest trends in artificial intelligence, machine learning, and AI\'s transformative impact across industries. Get expert insights on AI implementation strategies.',
    keywords: 'AI report 2025, artificial intelligence trends, AI industry analysis, machine learning insights, AI implementation guide, business AI transformation',
    openGraph: {
        title: 'AI Industry Report 2025 - Comprehensive AI Trends Analysis',
        description: 'Download our comprehensive AI Industry Report exploring the latest trends in artificial intelligence and its impact across various industries. Expert insights and implementation strategies.',
        images: [
            {
                url: 'https://backup.cultark.net/images/og-ai-report.jpg',
                width: 1200,
                height: 630,
                alt: 'AI Industry Report 2025',
            },
        ],
        url: 'https://backup.cultark.net/report',
        type: 'article',
        siteName: 'CULTARK',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AI Industry Report 2025 - Comprehensive AI Trends Analysis',
        description: 'Download our comprehensive AI Industry Report exploring the latest trends in artificial intelligence and its impact across various industries.',
        images: ['https://backup.cultark.net/images/og-ai-report.jpg'],
        site: '@cultark',
        creator: '@cultark',
    },
    other: {
        'article:published_time': '2025-01-01T00:00:00Z',
        'article:author': 'CULTARK Research Team',
    },
};

export default function ReportPage() {
    return <ReportPageClient />;
}