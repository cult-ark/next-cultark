/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ArrowRightLeft } from 'lucide-react';
import BlogPostCard from './BlogPostCard';
import { getBlogPosts } from '../../services/blog';
import SkeletonGenerator from '../../components/layout/SkeletonGenerator';
import LoadingProjectCard from '../../components/Portfolio/LoadingProjectCard';
const Blog = () => {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery(['blog'], () => getBlogPosts());
  if (error)
    return <p>Error fetching posts: {(error as AxiosError).message}</p>;
  return (
    <div className='max-w-[130rem] mx-auto pt-32 lg:pt-36 min-h-screen px-12 mb-5'>

      <div className='mt-5 mb-10'>
        <h1 className='text-h3 md:text-h1-2 xl:text-7xl order-1 group-even:text-right w-full flex items-center gap-6'>
          <span>Learn Our Ways</span> 
          <ArrowRightLeft size={50} />
        </h1>
        <p className='leading-none text-[1.5rem] font-medium'>
          We drop fresh takes and bold ideas every week—worth a read.
        </p>
      </div>
      <div className='container-grid gap-6'>
        {isLoading ? (
          <SkeletonGenerator skeleton={<LoadingProjectCard />} count={3} />
        ) : (
          posts?.map((post) => <BlogPostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default Blog;
