import { Metadata } from 'next';
import PortfolioProjects from '@/components/Portfolio/PortfolioProjects';

export const metadata: Metadata = {
    title: 'Portfolio - Cultark',
    description: 'Explore our portfolio of successful projects and case studies. See how we\'ve helped businesses grow through innovative digital marketing solutions.',
    keywords: 'portfolio, projects, case studies, digital marketing, web development, success stories',
    openGraph: {
        title: 'Portfolio - Cultark',
        description: 'Explore our portfolio of successful projects and case studies. See how we\'ve helped businesses grow through innovative digital marketing solutions.',
        type: 'website',
        url: '/portfolio',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Portfolio - Cultark',
        description: 'Explore our portfolio of successful projects and case studies. See how we\'ve helped businesses grow through innovative digital marketing solutions.',
    },
};

const PortfolioPage = () => {
    return (
        <>
            {/* <PortfolioHero /> */}
            <PortfolioProjects />
        </>
    );
};

export default PortfolioPage;