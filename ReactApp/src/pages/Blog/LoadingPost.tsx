import { FaSpinner } from 'react-icons/fa6';

const LoadingPost = () => {
  return (
    <div className='h-screen mx-auto relative'>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 z-10'>
        <FaSpinner
          size={50}
          className='animate-spin text-gray-400 ease-in-out transition duration-700'
        />
      </div>
      <div className='bg-gray-200 h-[40vh] mb-5 animate-pulse ' />
      <div className='max-w-[110rem] mx-auto space-y-5 animate-pulse px-12'>
        <div className='h-12 bg-gray-200 w-[500px] rounded-lg' />
        <div className='h-8 bg-gray-200 w-[420px] rounded-lg' />
        <div className='h-64 bg-gray-200 w-full rounded-lg' />
      </div>
    </div>
  );
};

export default LoadingPost;
