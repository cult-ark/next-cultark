'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { BlogPost } from '@/types/blog.type';
import { truncate } from '@/utils/text';
import ShareBox from './ShareBox';

const BlogPostCard = ({ post }: { post: BlogPost }) => {
    const router = useRouter();

    return (
        <div
            key={post.id}
            onClick={() => router.push(`/blog/${post.slug}`)}
            className='border rounded-lg shadow-md overflow-hidden p-2 pb-4 flex flex-col gap-4 cursor-pointer hover:shadow-lg'
        >
            {post.acf.thumbnail && (
                <Image
                    src={post.acf.thumbnail}
                    alt={post.title.rendered}
                    className='w-full aspect-square object-contain rounded-lg over'
                    width={400}
                    height={400}
                    loading="lazy"
                />
            )}
            <div className='px-4'>
                {post.acf.tag && (
                    <p className='text-[1.8rem] text-cultark-blue font-semibold'>
                        {post.acf.tag.map((tag) => tag.name).join(' • ')}
                    </p>
                )}
                <p className='text-gray-500 mb-2 leading-relaxed text-[1.5rem]'>
                    {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </p>
                <h2
                    className='font-medium text-3xl my-0 leading-relaxed'
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                <p className='mt-2'>{truncate(post.acf.summary, { length: 100 })}</p>
            </div>
            <ShareBox
                img={post.acf.thumbnail}
                post_title={post.title.rendered}
                post_url={`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.id}`}
                className='mt-auto ml-auto px-2'
                rounded='[&>*]:rounded-md [&>*>*]:rounded-lg !justify-center gap-2'
            />
        </div>
    );
};

export default BlogPostCard;