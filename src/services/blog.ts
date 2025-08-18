/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { BlogPost } from '../types/blog.type';

// Convert Vite env to Next.js env and use API proxy for client-side requests
const getWordPressUrl = () => {
    if (typeof window !== 'undefined') {
        // Client-side: use API proxy
        return '/api/wp';
    } else {
        // Server-side: use direct WordPress URL
        return process.env.NEXT_PUBLIC_WORDPRESS_URL;
    }
};

const getWordPressApiUrl = () => {
    const baseUrl = getWordPressUrl();
    if (typeof window !== 'undefined') {
        // Client-side: use API proxy (no /wp-json/wp/v2 needed)
        return `${baseUrl}/blog?acf_format=standard&_fields=id,title,slug,acf.summary,acf.content,acf.large_image,acf.thumbnail,acf.tag,featured_media,date`;
    } else {
        // Server-side: use full WordPress URL
        return `${baseUrl}/wp-json/wp/v2/blog?acf_format=standard&_fields=id,title,slug,acf.summary,acf.content,acf.large_image,acf.thumbnail,acf.tag,featured_media,date`;
    }
};

export const getBlogPosts = async (
    query?: string,
    start_date?: string,
    end_date?: string
): Promise<BlogPost[]> => {
    try {
        const res = await axios.get(
            getWordPressApiUrl() +
            (query && query !== undefined ? `&search=${query} ` : '') +
            (start_date && start_date !== undefined ? `&after=${start_date}` : '') +
            (end_date && end_date !== undefined ? `&before=${end_date}` : '')
        );

        if (!res.data || !Array.isArray(res.data)) {
            console.warn('Invalid blog posts response format');
            return [];
        }

        const postsWithImages = res.data.map((post: any) => ({
            ...post,
            featured_image: null,
            thumbnail: post.acf?.thumbnail || null,
        }));

        return postsWithImages;
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        // Return empty array instead of throwing to prevent app crashes
        return [];
    }
};

export const getBlogPost = async (slug: string): Promise<BlogPost | null> => {
    try {
        const res = await axios.get(`${getWordPressApiUrl()}&slug=${slug}`);

        if (!res.data || !Array.isArray(res.data) || res.data.length === 0) {
            console.warn(`Blog post not found for slug: ${slug}`);
            return null;
        }

        const post = res.data[0];

        if (post.featured_media) {
            try {
                const mediaUrl = typeof window !== 'undefined'
                    ? `/api/wp/media/${post.featured_media}`
                    : `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wp/v2/media/${post.featured_media}`;

                const imgRes = await axios.get(mediaUrl);
                return { ...post, featured_image: imgRes.data.source_url };
            } catch (imgError) {
                console.warn('Error fetching featured image:', imgError);
                return { ...post, featured_image: null };
            }
        }

        return { ...post, featured_image: null };
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return null;
    }
};