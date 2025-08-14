const LoadingProjectCard = () => {
  return (
    <div className='flex flex-col justify-between p-5 border rounded-2xl gap-5 animate-pulse'>
      <div className='space-y-5'>
        {/* Image Skeleton */}
        <div className='w-full aspect-square bg-gray-300 rounded-2xl'></div>

        {/* Title Skeleton */}
        <div className='h-6 bg-gray-300 rounded w-3/4'></div>

        {/* Tags Skeleton */}
        <div className='flex gap-3 flex-wrap'>
          <div className='h-6 w-16 bg-gray-300 rounded-3xl'></div>
          <div className='h-6 w-12 bg-gray-300 rounded-3xl'></div>
          <div className='h-6 w-20 bg-gray-300 rounded-3xl'></div>
        </div>

        {/* Summary Skeleton */}
        <div className='space-y-2'>
          <div className='h-4 bg-gray-300 rounded w-full'></div>
          <div className='h-4 bg-gray-300 rounded w-5/6'></div>
          <div className='h-4 bg-gray-300 rounded w-2/3'></div>
        </div>
      </div>

      {/* Button Skeleton */}
      <div className='bg-gray-300 w-full py-3 rounded-lg'></div>
    </div>
  );
};

export default LoadingProjectCard;
