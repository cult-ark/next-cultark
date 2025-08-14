import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/common/Breadcrumb';
import { getServiceBySlug, getServiceItems, ServiceItem } from '../../services/cultark-services';
import { useQuery } from '@tanstack/react-query';
import Service from '../../types/Service';
import LoadingPage from '../../components/layout/LoadingPage';
import Tags from '../../components/Portfolio/Tags';

const SingleServicePage = () => {
  const { slug } = useParams();
  console.log('🚀 SingleServicePage rendered with slug:', slug);

  const {
    data: service,
    isLoading: serviceLoading,
    error: serviceError,
    isError: serviceIsError,
  } = useQuery<Service, Error>(
    ['service', slug],
    () => getServiceBySlug(slug as string),
    {
      enabled: !!slug,
      retry: 2,
      refetchOnWindowFocus: false,
    }
  );

  const {
    data: serviceItems,
    isLoading: itemsLoading,
    error: itemsError,
    isError: itemsIsError,
  } = useQuery<ServiceItem[], Error>(
    ['serviceItems', service?.id],
    () => {
      const serviceId = parseInt(service!.id);
      console.log('🔄 About to fetch items for service ID:', serviceId);
      return getServiceItems(serviceId);
    },
    {
      enabled: !!service?.id,
      retry: 2,
      refetchOnWindowFocus: false,
    }
  );

  const isLoading = serviceLoading || itemsLoading;
  const error = serviceError || itemsError;
  const isError = serviceIsError || itemsIsError;
  if (isLoading || error)
    return (
      <LoadingPage
        isError={isError}
        error={error as Error}
        errorPrefix='Error fetching service: '
        loadingPrefix='Loading Service...'
      />
    );

  return (
    <>
      <div className='pt-32 px-6 max-w-[110rem] mx-auto z-10 min-h-screen relative mb-10'>
        <Breadcrumb
          items={[
            { label: 'Home', url: '/' },
            { label: 'Services', url: '/services' },
            { label: service?.title.rendered as string, url: '' },
          ]}
        />
        {service.acf.service_items && service.acf.service_items.length > 0 && (
          <Tags
            tags={service.acf.service_items.map((item) => ({
              term_id: item,
              name: item,
            }))}
            className='!mt-2'
          />
        )}

        {/* Enhanced Title with Cool Effects */}
        <div className='relative mt-8 mb-8'>
          {/* Decorative elements around title */}
          <div className="absolute -top-3 -left-3 w-12 h-12 border-l-4 border-t-4 border-blue-400 opacity-60"></div>
          <div className="absolute -top-3 -right-3 w-12 h-12 border-r-4 border-t-4 border-blue-400 opacity-60"></div>
          <div className="absolute -bottom-3 -left-3 w-8 h-8 border-l-4 border-b-4 border-blue-400 opacity-60"></div>
          <div className="absolute -bottom-3 -right-3 w-8 h-8 border-r-4 border-b-4 border-blue-400 opacity-60"></div>

          {/* Tape effect on title */}
          <div className="absolute top-2 right-8 w-16 h-8 bg-yellow-200 opacity-70 transform rotate-12 shadow-md"></div>

          <h1 className='md:text-h2-2 relative z-10 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border-2 border-gray-100'>
            {service?.title.rendered}
          </h1>
        </div>

        {/* Service Image with Collage Effects */}
        {service?.acf.image && (
          <div className='relative my-12 flex justify-center'>
            {/* Decorative border elements for collage effect */}
            <div className="absolute -top-4 -left-4 w-12 h-12 border-l-6 border-t-6 border-blue-400 z-10"></div>
            <div className="absolute -top-4 -right-4 w-12 h-12 border-r-6 border-t-6 border-orange-400 z-10"></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 border-l-6 border-b-6 border-blue-400 z-10"></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-r-6 border-b-6 border-purple-400 z-10"></div>

            {/* Main image with polaroid-style border */}
            <div className="relative p-6 bg-white transform hover:rotate-1 transition-transform duration-300 shadow-2xl max-w-2xl">
              <img
                src={service.acf.image}
                alt={service.title.rendered + ' image'}
                className="w-full h-auto object-cover shadow-lg border-4 border-gray-100"
              />
              {/* Vintage photo corner cuts */}
              <div className="absolute top-2 left-2 w-6 h-6 bg-gray-200 transform rotate-45"></div>
              <div className="absolute top-2 right-2 w-6 h-6 bg-gray-200 transform rotate-45"></div>
              <div className="absolute bottom-2 left-2 w-6 h-6 bg-gray-200 transform rotate-45"></div>
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-gray-200 transform rotate-45"></div>

              {/* Photo caption */}
              <div className="mt-4 text-center">
                <p className="text-gray-600 italic font-handwriting text-lg">
                  {service.title.rendered}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Service Description with Cool Effects */}
        {service?.acf.description && (
          <div className='relative my-10'>
            {/* Decorative corner */}
            <div className="absolute -top-2 -left-2 w-8 h-8 border-l-3 border-t-3 border-cultark-green opacity-50"></div>
            <div className='bg-gradient-to-r from-white to-gray-50 p-6 rounded-lg shadow-lg border-l-4 border-cultark-green'>
              <p className='text-gray-700 leading-relaxed text-2xl'>
                {service.acf.description}
              </p>
            </div>
          </div>
        )}

        {serviceItems && serviceItems.length > 0 && (
          <div className='mt-12'>
            {/* Section Title with Effects */}
            <div className='relative mb-8'>
              {/* <div className="absolute -top-2 -left-2 w-10 h-10 border-l-4 border-t-4 border-black opacity-60"></div> */}
              <h2 className='text-2xl font-bold text-gray-800 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md border border-blue-400 inline-block'>
                Service Details
              </h2>
            </div>

            <div className='space-y-8'>
              {serviceItems.map((item, index) => (
                <div key={item.id} className='relative group'>

                  <div className='border-2 border-gray-400 rounded-lg p-6 bg-white shadow-lg hover:shadow-xl'>
                    <h3 className='font-bold mb-4 text-gray-800 text-2xl border-b-2 border-blue-400/30 pb-2'>
                      {item.acf.item_title || 'No title'}
                    </h3>
                    <p className='text-gray-600 leading-relaxed text-2xl'>
                      {item.acf.item_description || 'No description'}
                    </p>

                    {/* Decorative bottom corner */}
                    <div className={`absolute -bottom-2 ${index % 2 === 0 ? '-right-2' : '-left-2'} w-6 h-6 border-r-3 border-b-3 ${index % 3 === 0 ? 'border-cultark-green' : index % 3 === 1 ? 'border-cultark-green' : 'border-cultark-green'} opacity-60`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default SingleServicePage;
