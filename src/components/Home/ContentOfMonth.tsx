'use client'

import { useQuery } from '@tanstack/react-query';
import { getBlogPosts } from '@/services/blog';
import { truncate } from '@/utils/text';
import { FaArrowRight } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

const ContentOfMonth = () => {
    const {
        data: posts,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['latest-blog-posts'],
        queryFn: () => {
            // Fetch all blog posts without date filtering to get the latest ones
            return getBlogPosts();
        }
    });
    const router = useRouter();
    return (
        <div className='w-full bg-cultark-gray text-cultark-white'>
            <div className='px-6 py-14 lg:pt-28 max-w-[110rem] mx-auto z-10'>

                <h2 className='text-h1-2 font-light text-width-max mb-0'>
                    Latest Content
                </h2>
                <p className='text-14 font-light uppercase leading-none mt-0 mb-10'>
                    Our Most Recent Blog Posts
                </p>
                {isLoading ? (
                    <div>Loading content...</div>
                ) : error ? (
                    <div>An error occured while loading latest content...</div>
                ) : (
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
                        {posts?.slice(0, 3).map((post) => (
                            <div
                                key={post.id}
                                className={`aspect-[1/1.3] rounded-lg bg-cover bg-center relative overflow-clip`}
                                style={{
                                    backgroundImage: `url(${post.acf.thumbnail})`,
                                }}
                            >
                                <div
                                    className='bg-black/50 hover:bg-black/70 w-full h-full lg:p-10 p-6 flex items-end hover:items-center cursor-pointer group'
                                    onClick={() => router.push(`/blog/${post.slug}`)}
                                >
                                    <button className='items-center gap-5 text-center justify-center w-full group-hover:flex hidden'>
                                        Read More <FaArrowRight />
                                    </button>
                                    <div className='group-hover:hidden'>
                                        <h3 className='text-h3 font-light mb-0.5'>
                                            {post.title.rendered}
                                        </h3>
                                        {post.acf.tag && (
                                            <div className=' flex items-center gap-2'>
                                                {post.acf.tag.slice(0, 3).map((tag) => (
                                                    <span key={tag.name} className='text-sm text-black bg-white px-2 py-1 rounded-md'>
                                                        {tag.name}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        <p className='text-14 mt-5 font-light'>
                                            {truncate(post.acf.summary, { length: 200 })}
                                        </p>
                                        <button className='flex items-center gap-5 ml-auto mt-5'>
                                            Read More <FaArrowRight />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContentOfMonth;