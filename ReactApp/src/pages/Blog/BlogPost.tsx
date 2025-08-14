/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import LoadingPost from './LoadingPost';
import LoadingPage from '../../components/layout/LoadingPage';
import { getBlogPost } from '../../services/blog';

// import 'http://localhost:8888/wp-includes/css/dashicons.min.css?ver=6.7.1';
// import 'http://localhost:8888/wp-includes/blocks/navigation/style.min.css?ver=6.7.1';

const BlogPost = () => {
  const { slug } = useParams();
  const {
    data: post,
    isLoading,
    error,
    isError,
  } = useQuery(['blogPost', slug], () => getBlogPost(slug || ''), {
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
  return (
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
  );
};

export default BlogPost;
