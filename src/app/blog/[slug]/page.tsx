import { Metadata } from 'next';
import { getBlogPost } from '@/services/blog';
import BlogPostClient from './BlogPostClient';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    try {
        const { slug } = await params;
        const post = await getBlogPost(slug);

        if (!post) {
            return {
                title: 'Blog Post Not Found | Cultark',
                description: 'The requested blog post could not be found.',
            };
        }

        return {
            title: `${post.title.rendered} | Cultark Blog`,
            description: post.acf.summary || 'Read this insightful blog post from Cultark.',
            keywords: post.acf.tag?.map(tag => tag.name) || [],
            openGraph: {
                title: post.title.rendered,
                description: post.acf.summary || 'Read this insightful blog post from Cultark.',
                type: 'article',
                url: `/blog/${slug}`,
                images: post.acf.thumbnail ? [
                    {
                        url: post.acf.thumbnail,
                        width: 1200,
                        height: 630,
                        alt: post.title.rendered,
                    }
                ] : [],
                publishedTime: post.date,
            },
            twitter: {
                card: 'summary_large_image',
                title: post.title.rendered,
                description: post.acf.summary || 'Read this insightful blog post from Cultark.',
                images: post.acf.thumbnail ? [post.acf.thumbnail] : [],
            },
        };
    } catch (error) {
        console.error('Error generating metadata for blog post:', error);
        return {
            title: 'Blog Post | Cultark',
            description: 'Read this insightful blog post from Cultark.',
        };
    }
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
    const { slug } = await params;

    try {
        // Validate that the post exists
        const post = await getBlogPost(slug);
        if (!post) {
            notFound();
        }
    } catch (error) {
        console.error('Error fetching blog post:', error);
        notFound();
    }

    return <BlogPostClient slug={slug} />;
};

export default BlogPostPage;