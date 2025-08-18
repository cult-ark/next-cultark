'use client';

import { useQuery } from '@tanstack/react-query';
import Service from '@/types/Service';
import { Fragment } from 'react';
import Image from 'next/image';
import { getServices } from '@/services/cultark-services';
import LoadingServices from './LoadingServices';
import Link from 'next/link';

// Enhanced card component that wraps HorizontalFeatureCard with service-specific features
const EnhancedServiceCard = ({ service, index }: { service: Service; index: number }) => {
    // Create description from service items and description
    const serviceDescription = service.acf.description ||
        `Our ${service.title.rendered.toLowerCase()} service includes: ${service.acf.service_items?.slice(0, 2).join(', ')}${service.acf.service_items?.length > 2 ? ', and more.' : '.'}`;

    // Determine if this card should be reversed (every other card)
    const isReversed = index % 2 === 1;

    return (
        <div className='relative group'>
            {/* Custom card with alternating layout */}
            <div className={`w-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white rounded-lg`}>
                {/* Main flex container - horizontal on desktop, vertical on mobile */}
                <div className={`flex flex-col lg:flex-row ${isReversed ? 'lg:flex-row-reverse' : ''}`}>

                    {/* Image Container with Collage Effects */}
                    <div className="w-full lg:w-2/5 flex-shrink-0 relative">
                        {/* Decorative border elements for collage effect */}
                        <div className="absolute -top-2 -left-2 w-8 h-8 border-l-4 border-t-4 border-cultark-green z-10"></div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 border-r-4 border-t-4 border-orange-400 z-10"></div>
                        <div className="absolute -bottom-2 -left-2 w-8 h-8 border-l-4 border-b-4 border-blue-400 z-10"></div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-4 border-b-4 border-purple-400 z-10"></div>

                        {/* Corner tape effects */}
                        <div className="absolute top-14 right-2 w-12 h-6 bg-yellow-200 opacity-80 transform rotate-12 shadow-md z-10"></div>
                        <div className="absolute bottom-4 left-4 w-10 h-5 bg-pink-200 opacity-80 transform -rotate-6 shadow-md z-10"></div>

                        {/* Main image with polaroid-style border */}
                        <div className="relative p-3 bg-white transform hover:rotate-1 transition-transform duration-300">
                            <Image
                                src={service.acf.image}
                                alt={service.title.rendered}
                                className="w-full h-64 sm:h-72 lg:h-80 xl:h-full object-cover shadow-lg border-2 border-gray-100"
                                width={800}
                                height={600}
                                loading="lazy"
                            />
                            {/* Vintage photo corner cuts */}
                            <div className="absolute top-1 left-1 w-4 h-4 bg-gray-200 transform rotate-45"></div>
                            <div className="absolute top-1 right-1 w-4 h-4 bg-gray-200 transform rotate-45"></div>
                        </div>
                    </div>

                    {/* Text Content Container */}
                    <div className="w-full lg:w-3/5 p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col">
                        <div className="p-0 mb-4 lg:mb-6">
                            <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight">
                                {`${index + 1}. ${service.title.rendered}`}
                            </h3>
                        </div>
                        <div className="p-0">
                            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-600 leading-relaxed">
                                {serviceDescription}
                            </p>
                        </div>
                        {/* Learn More Button - inside text container to avoid overlap and fixed at column end */}
                        <div className="mt-4 sm:mt-6 mt-auto self-start">
                            <Link href={`/services/${service.slug}`}>
                                <button className='bg-cultark-green hover:bg-cultark-green/90 text-black px-4 py-2 sm:px-6 sm:py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base font-medium'>
                                    Learn More
                                </button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

            {/* Service Items as Pills */}
            <div className={`absolute top-4 ${isReversed ? 'right-4 sm:right-6' : 'left-4 sm:left-6'} flex flex-wrap gap-2 max-w-[250px] sm:max-w-[300px]`}>
                {service.acf.service_items?.slice(0, 3).map((item, idx) => (
                    <span
                        key={idx}
                        className='bg-white/95 backdrop-blur-sm text-xs sm:text-sm px-3 py-1.5 rounded-full text-gray-700 shadow-md border border-gray-200'
                    >
                        {item.length > 20 ? `${item.substring(0, 20)}...` : item}
                    </span>
                ))}
                {service.acf.service_items?.length > 3 && (
                    <span className='bg-cultark-green/90 backdrop-blur-sm text-xs sm:text-sm px-3 py-1.5 rounded-full text-black shadow-md'>
                        +{service.acf.service_items.length - 3} more
                    </span>
                )}
            </div>

        </div>
    );
};

const ServicesList = () => {
    const { data: services, isLoading, error } = useQuery<Service[]>({
        queryKey: ['services', 20],
        queryFn: async () => await getServices(20),
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    });

    if (isLoading) return <LoadingServices />;

    if (error) {
        return (
            <div className="container-80 py-8 lg:py-16">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Unable to load services</h2>
                    <p className="text-gray-600">Please try refreshing the page or contact support if the problem persists.</p>
                </div>
            </div>
        );
    }

    return (
        <Fragment>
            {/* Bootstrap-like container with 80% width */}
            <div className='container-80 py-8 lg:py-16'>
                <div className='space-y-16 lg:space-y-20'>
                    {services
                        ?.sort((a, b) => a.acf.order - b.acf.order)
                        ?.map((service, index) => (
                            <div key={service.id} className='w-full'>
                                <EnhancedServiceCard
                                    service={service}
                                    index={index}
                                />
                            </div>
                        ))}
                </div>
            </div>
        </Fragment>
    );
};

export default ServicesList;