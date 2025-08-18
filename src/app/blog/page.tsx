import { Metadata } from 'next';
import BlogPageClient from './BlogPageClient';

export const metadata: Metadata = {
    title: 'Blog - Learn Our Ways | Cultark',
    description: 'We drop fresh takes and bold ideas every week—worth a read. Explore our latest insights on marketing, design, and digital strategy.',
    keywords: ['blog', 'marketing insights', 'digital strategy', 'design tips', 'cultark blog'],
    openGraph: {
        title: 'Blog - Learn Our Ways | Cultark',
        description: 'We drop fresh takes and bold ideas every week—worth a read. Explore our latest insights on marketing, design, and digital strategy.',
        type: 'website',
        url: '/blog',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blog - Learn Our Ways | Cultark',
        description: 'We drop fresh takes and bold ideas every week—worth a read. Explore our latest insights on marketing, design, and digital strategy.',
    },
};

const BlogPage = () => {
    return <BlogPageClient />;
};

export default BlogPage;