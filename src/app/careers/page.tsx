import { Metadata } from 'next';
import CareersPageClient from './CareersPageClient';

export const metadata: Metadata = {
    title: 'Join Our Team - Careers at CULTARK | Digital Marketing Agency',
    description: 'Join CULTARK\'s innovative team of digital marketing experts. We\'re looking for talented individuals passionate about AI, marketing, and creative solutions. Apply now to become part of our growing agency.',
    keywords: 'careers, jobs, digital marketing careers, AI marketing jobs, creative agency jobs, marketing positions, CULTARK careers',
    openGraph: {
        title: 'Join Our Team - Careers at CULTARK',
        description: 'Join CULTARK\'s innovative team of digital marketing experts. We\'re looking for talented individuals passionate about AI, marketing, and creative solutions.',
        images: [
            {
                url: 'https://cultark.com/images/careers-back.jpeg',
                width: 1200,
                height: 630,
                alt: 'CULTARK Careers - Join Our Team',
            },
        ],
        url: 'https://cultark.com/careers',
        type: 'website',
        siteName: 'CULTARK',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Join Our Team - Careers at CULTARK',
        description: 'Join CULTARK\'s innovative team of digital marketing experts. Apply now to become part of our growing agency.',
        images: ['https://cultark.com/images/careers-back.jpeg'],
        site: '@cultark',
        creator: '@cultark',
    },
};

export default function CareersPage() {
    return <CareersPageClient />;
}