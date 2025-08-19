import { Metadata } from 'next';
import ServicesList from '@/components/Services/ServicesList';

export const metadata: Metadata = {
    title: 'Our Services - CULTARK',
    description: 'Explore CULTARK\'s comprehensive suite of performance marketing services including SEO, media production, design & production, and digital products. Drive growth with data-driven strategies.',
    keywords: 'performance marketing services, SEO services, media production, design services, digital products, marketing agency services',
    openGraph: {
        title: 'Our Services - CULTARK',
        description: 'Comprehensive suite of performance marketing services including SEO, media production, and digital transformation solutions.',
        images: [
            {
                url: 'https://backup.cultark.net/images/og-services.jpg',
                width: 1200,
                height: 630,
                alt: 'CULTARK Services',
            },
        ],
        url: 'https://backup.cultark.net/services',
        type: 'website',
        siteName: 'CULTARK',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Our Services - CULTARK',
        description: 'Explore our comprehensive suite of performance marketing services including SEO, media production, and digital transformation.',
        images: ['https://backup.cultark.net/images/og-services.jpg'],
        site: '@cultark',
    },
};

export default function ServicesPage() {
    return (
        <div className='pt-24 lg:pt-36'>
            <div className='relative min-h-screen'>
                <ServicesList />
            </div>
        </div>
    );
}