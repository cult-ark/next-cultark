'use client'

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
const profile_pic = '/images/profile-pic.png';
import axios from 'axios';

const Testimonials = () => {
    const { data: testimonials } = useQuery({
        queryKey: ['testimonials'],
        queryFn: async () => {
            const res = await axios(`/api/wp/testimonials?acf_format=standard&page=1&&per_page=2`);

            return res.data;
        }
    });
    return (
        <div className='max-w-[110rem] mx-auto py-10 lg:pt-28 relative w-screen mb-10 lg:mb-28 overflow-hidden md:overflow-visible'>

            <div
                className='px-20 text-left lg:text-[8vw] text-[14vw] font-semibold leading-none font-manrope xl:scale-x-125'
                style={{ fontStretch: '150%' }}
            >
                DON'T TAKE OUR WORD FOR IT, HERE'S WHAT PEOPLE THINK OF US
            </div>
            <div
                className='w-full h-full absolute left-0 top-0 flex items-center justify-center gap-10 overflow-x-scroll no-scrollbar'
                style={{}}
            >
                {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (testimonials as any[])?.map((testimonial: any) => (
                        <div
                            key={testimonial.slug}
                            className='first:ml-[90vw] sm:first:ml-[90vw] xl:first:ml-[30vw]  last:mr-10 md:min-h-[50%] xl:min-h-[40%] h-fit bg-white/40 rounded-2xl backdrop-blur-md lg:w-[500px] w-[80%] flex flex-col justify-between p-8 shrink-0'
                        >
                            <div className='relative w-32 h-12'>
                                <Image
                                    src={testimonial.acf.logo}
                                    alt={`${testimonial.acf.author_name} company logo`}
                                    fill
                                    className='object-contain object-left'
                                    sizes="128px"
                                />
                            </div>
                            <div>
                                <p className='md:text-h3 font-semibold'>
                                    {testimonial.title.rendered}
                                </p>
                                <p>{testimonial.acf.testimonial}</p>
                            </div>
                            <div className='flex items-center gap-3'>
                                <div
                                    style={{
                                        backgroundImage: `url('${testimonial.acf.picture || profile_pic
                                            }')`,
                                    }}
                                    className={`w-14 rounded-full shadow-md aspect-square bg-no-repeat bg-cover bg-center hidden md:block`}
                                />
                                <div>
                                    <p className='md:text-xl font-medium'>
                                        ~ {testimonial.acf.author_name}
                                    </p>
                                    <p className='text-sm text-black/70 leading-none font-light'>
                                        {testimonial.acf.author_position}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Testimonials;