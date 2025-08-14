/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { BlogPost } from '../types/blog.type';

const WORDPRESS_API_URL = `${
  import.meta.env.VITE_WORDPRESS_URL
}/wp-json/wp/v2/blog?&acf_format=standard&_fields=id,title,slug,acf.summary,acf.content,%20acf.large_image,acf.thumbnail,acf.tag,featured_media,date`;

export const getBlogPosts = async (
  query?: string,
  start_date?: string,
  end_date?: string
): Promise<BlogPost[]> => {
  const res = await axios.get(
    WORDPRESS_API_URL +
      (query && query !== undefined ? `&search=${query} ` : '') +
      (start_date && start_date !== undefined ? `&after=${start_date}` : '') +
      (end_date && end_date !== undefined ? `&before=${end_date}` : '')
  );
  const postsWithImages = res.data.map((post: any) => ({
    ...post,
    featured_image: null,
    thumbnail: post.acf?.thumbnail || null,
  }));

  return postsWithImages;
};

export const getBlogPost = async (slug: string): Promise<BlogPost> => {
  const res = await axios.get(`${WORDPRESS_API_URL}&slug=${slug}`);
  const post = res.data[0];
  if (post.featured_media) {
    const imgRes = await axios.get(
      `${import.meta.env.VITE_WORDPRESS_URL}/wp-json/wp/v2/media/${
        post.featured_media
      }`
    );
    return { ...post, featured_image: imgRes.data.source_url };
  }

  return { ...post, featured_image: null };
};
