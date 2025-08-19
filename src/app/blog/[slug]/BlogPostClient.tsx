'use client';

import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Script from 'next/script';
import LoadingPost from '@/components/Blog/LoadingPost';
import LoadingPage from '@/components/layout/LoadingPage';
import { getBlogPost } from '@/services/blog';
import { generateBlogPostStructuredData } from '@/lib/structured-data';

interface BlogPostClientProps {
    slug: string;
}

const BlogPostClient = ({ slug }: BlogPostClientProps) => {
    const {
        data: post,
        isLoading,
        error,
        isError,
    } = useQuery({
        queryKey: ['blogPost', slug],
        queryFn: () => getBlogPost(slug),
        enabled: !!slug,
        retry: 2,
        refetchOnWindowFocus: false,
    });

    if (isError)
        return (
            <LoadingPage
                isError={true}
                error={error as AxiosError}
                errorPrefix='Error fetching blog post: '
                loadingPrefix=''
            />
        );
    if (isLoading) return <LoadingPost />;

    // Generate structured data for the blog post
    const structuredData = post ? generateBlogPostStructuredData({
        title: post.title.rendered,
        description: post.acf.summary || post.title.rendered,
        author: 'CULTARK',
        publishedDate: post.date,
        modifiedDate: post.date,
        image: post.acf.thumbnail || post.featured_image,
        url: `https://backup.cultark.net/blog/${slug}`,
        tags: post.acf.tag?.map(tag => tag.name) || []
    }) : null;

    return (
        <>
            {structuredData && (
                <Script
                    id={`blog-post-structured-data-${slug}`}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData),
                    }}
                />
            )}
            <div className='min-h-screen pt-28'>
                {post && post.featured_image && (
                    <div
                        className='bg-cover bg-center'
                        style={{
                            backgroundImage: `url(${post?.featured_image})`,
                        }}
                    ></div>
                )}
                <div
                    className='bg-cover bg-center h-[50vh] relative flex items-end justify-center mb-5'
                    style={
                        post?.featured_image
                            ? { backgroundImage: `url(${post.featured_image})` }
                            : {}
                    }
                >
                    <div className='bg-black/60 h-full absolute w-full z-1' />
                    <h1 className='text-h1-2 text-white z-10 relative px-5 !text-center'>
                        {post?.title.rendered}
                    </h1>
                </div>
                <div
                    dangerouslySetInnerHTML={{
                        __html: post?.acf.content ?? '',
                    }}
                    className='max-w-[110rem] mx-auto px-12 my-10'
                ></div>
            </div>
        </>
    );
};

export default BlogPostClient;