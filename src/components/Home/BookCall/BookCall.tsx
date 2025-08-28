'use client'

import { useEffect, useState, Suspense, lazy } from 'react';
import scrollToElement from 'scroll-to-element';
import { useSearchParams } from 'next/navigation';

// Dynamically import BookCallModal to reduce initial bundle size
const BookCallModal = lazy(() => import('./BookCallModal'));
import { Calendar } from 'lucide-react';

const BookCallContent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        const scrollTo = searchParams.get('scrollTo');

        if (scrollTo === 'getInTouch') {
            scrollToElement('#getInTouch', {
                offset: -50,
                ease: 'in-out-expo',
                duration: 1000,
            });
        }
    }, [searchParams]);

    return (
        <div className='relative py-16 md:py-28 mt-5 overflow-x-hidden' id='getInTouch'>
            <div className='xl:absolute right-0 top-0 z-20'>
                <div className='bg-cultark-blue uppercase text-cultark-white xl:rounded-l-xl xl:rounded-r-none rounded-r-xl xl:px-6 py-4 xl:py-8 px-8 xl:text-vertical-lr w-fit xl:w-auto text-center mb-5 xl:mb-0 shadow-lg xl:min-h-[120px] xl:flex xl:items-center xl:justify-center'>
                    <p className='font-medium tracking-wider xl:whitespace-nowrap'>Get In Touch</p>
                </div>
            </div>

            <div className='px-6 max-w-[110rem] mx-auto z-10'>
                <div className='max-w-4xl'>
                    <p className='text-16 lg:w-3/5 font-light uppercase mb-6 text-gray-600'>
                        Curious? Let's talk, book a call and let's figure it out together.
                    </p>

                    <h2 className='text-h2 font-light text-width-max mt-0 mb-8 uppercase'>
                        Book a Call
                    </h2>

                    <div className='flex flex-col gap-4'>
                        <div className='flex items-center gap-2 text-gray-600 text-xl'>
                            {/* <Phone className='w-4 h-4' /> */}
                            <h4>30-minute consultation</h4>
                        </div>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className='group inline-flex items-center gap-3 px-8 py-4 bg-cultark-blue text-white font-semibold rounded-lg hover:bg-cultark-blue/90 transition-all duration-200 hover:shadow-lg hover:scale-105 w-fit'
                        >
                            <Calendar className='w-5 h-5' />
                            Book Now!
                        </button>
                    </div>
                </div>

                <Suspense fallback={null}>
                    <BookCallModal open={isModalOpen} setOpen={setIsModalOpen} />
                </Suspense>
            </div>
        </div>
    );
};

const BookCall = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BookCallContent />
        </Suspense>
    );
};

export default BookCall;