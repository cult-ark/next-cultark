'use client'

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
const profile_pic = '/images/profile-pic.png';
import { axiosInstance } from '@/utils/axios-config';

type WordPressTestimonial = {
    slug: string;
    title: {
        rendered: string;
    };
    acf: {
        logo: string;
        author_name: string;
        author_position: string;
        testimonial: string;
        picture?: string;
    };
};

const Testimonials = () => {
    const { data: testimonials, isLoading, error } = useQuery<WordPressTestimonial[]>({
        queryKey: ['testimonials'],
        queryFn: async () => {
            try {
                const res = await axiosInstance.get<WordPressTestimonial[]>(
                    `/wp-json/wp/v2/testimonials?acf_format=standard&page=1&per_page=2`
                );
                
                // We use cleanApiResponse globally, but check here just to be safe
                if (res.data && Array.isArray(res.data)) {
                    return res.data;
                }
                return [];
            } catch (error: unknown) {
                console.error('Failed to fetch testimonials:', error);
                return [];
            }
        },
        // We do NOT want to use initialData: [] because it forces the query to resolve instantly as "success" with empty data,
        // which prevents the "isLoading" state from working and immediately renders "No testimonials".
    });

    return (
        <section className='w-full py-16 lg:py-24'>
            <div className='max-w-[80%] mx-auto px-6'>
                {/* Header */}
                <div className='mb-12 lg:mb-16'>
                    <h2
                        className='text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-tight font-manrope text-center lg:text-left'
                        style={{ fontStretch: '150%' }}
                    >
                        {"DON'T TAKE OUR WORD FOR IT, HERE'S WHAT PEOPLE THINK OF US"}
                    </h2>
                </div>

                {/* Testimonials Grid */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8'>
                    {Array.isArray(testimonials) && testimonials.length > 0 && testimonials.map((testimonial) => (
                        <div
                            key={testimonial.slug}
                            className='bg-white/40 rounded-2xl backdrop-blur-md p-6 lg:p-8 flex flex-col justify-between min-h-[300px] shadow-lg hover:shadow-xl transition-shadow duration-300'
                        >
                            {/* Company Logo */}
                            <div className='mb-6'>
                                <div className='relative w-32 h-12'>
                                    <Image
                                        src={testimonial.acf.logo}
                                        alt={`${testimonial.acf.author_name} company logo`}
                                        fill
                                        className='object-contain object-left'
                                        sizes="128px"
                                    />
                                </div>
                            </div>

                            {/* Testimonial Content */}
                            <div className='flex-grow mb-6'>
                                <h3 className='text-xl lg:text-2xl font-semibold mb-4 text-gray-900'>
                                    {testimonial.title.rendered}
                                </h3>
                                <p className='text-gray-700 leading-relaxed'>
                                    {testimonial.acf.testimonial}
                                </p>
                            </div>

                            {/* Author Info */}
                            <div className='flex items-center gap-4'>
                                <div
                                    style={{
                                        backgroundImage: `url('${testimonial.acf.picture || profile_pic}')`,
                                    }}
                                    className='w-12 h-12 lg:w-14 lg:h-14 rounded-full shadow-md bg-no-repeat bg-cover bg-center flex-shrink-0'
                                />
                                <div>
                                    <p className='text-lg lg:text-xl font-medium text-gray-900'>
                                        ~ {testimonial.acf.author_name}
                                    </p>
                                    <p className='text-sm text-gray-600 font-light'>
                                        {testimonial.acf.author_position}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {isLoading ? (
                    <div className='text-center py-12'>
                        <p className='text-gray-500'>Loading testimonials...</p>
                    </div>
                ) : (!testimonials || testimonials.length === 0) ? (
                    <div className='text-center py-12'>
                        <p className='text-gray-500'>No testimonials available at the moment.</p>
                    </div>
                ) : null}
            </div>
        </section>
    );
};

export default Testimonials;
