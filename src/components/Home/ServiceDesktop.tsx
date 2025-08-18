'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatToTwoDigits } from '@/utils/functions';
import { FaArrowRight } from 'react-icons/fa6';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { truncate } from '@/utils/text';
import { cx } from 'class-variance-authority';

export interface Props {
    services: any[]; // Replace with actual type if available
    isLoading: boolean;
    selectedService: any; // Replace with actual type if available
    setSelectedService: (service: any) => void; // Replace with actual type if available
    buttonsHeight: string; // e.g., '200px'
}

const ServiceDesktop = ({
    services,
    isLoading,
    selectedService,
    setSelectedService,
    buttonsHeight,
}: Props) => {
    const router = useRouter();
    return (
        <div className='hidden my-5 lg:mt-28 lg:grid lg:grid-cols-custom-3 gap-5'>

            <div className='flex flex-col items-start gap-5'>
                {isLoading ? (
                    <div>Loading services...</div>
                ) : (
                    services &&
                    selectedService &&
                    services?.map((service, index) => (
                        <button
                            className={cx(
                                'flex gap-5 text-btn font-archivo px-10 py-6 w-full rounded-full items-center',
                                selectedService.slug === service.slug
                                    ? 'bg-cultark-gray text-cultark-white'
                                    : 'border border-[#DDDDDD] hover:shadow-md'
                            )}
                            onClick={() => setSelectedService(service)}
                            key={service.slug}
                        >
                            <span
                                className={cx(
                                    'font-extrabold',
                                    selectedService.slug === service.slug
                                        ? 'text-cultark-green'
                                        : ''
                                )}
                            >
                                {formatToTwoDigits(index + 1)}
                            </span>
                            <span>{service.title.rendered}</span>
                        </button>
                    ))
                )}

                <Link
                    className={cx(
                        'flex gap-5 text-btn font-archivo px-10 py-5 w-full rounded-full items-center justify-between border border-[#DDDDDD] hover:shadow-md group',
                        'bg-cultark-green text-cultark-gray hover:bg-cultark-blue hover:text-white'
                    )}
                    href={'/services'}
                >
                    Explore all services
                    <FaArrowRight className='' />
                </Link>
            </div>
            {selectedService && (
                <div className={`hidden lg:block w-full max-h-[${buttonsHeight}]`}>
                    <div
                        className={`w-full rounded-[32px] lg:min-h-[400px] h-72 bg-no-repeat bg-center bg-cover overflow-clip group`}
                        style={{
                            backgroundImage: `url(${selectedService?.acf.image})`,
                        }}
                        onClick={() => router.push(`/services/${selectedService.slug}`)}
                    >
                        <div className='bg-black/70 w-full h-full text-white flex flex-col justify-between p-6 lg:p-12 cursor-pointer'>
                            <div>
                                <h2>{selectedService.title.rendered}</h2>
                                <p className='text'>
                                    {' '}
                                    {truncate(selectedService.acf.description, {
                                        length: 350,
                                    })}
                                </p>
                            </div>
                            <Link
                                className='ml-auto flex items-center gap-3 group-hover:text-cultark-green border-b group-hover:border-cultark-green border-transparent'
                                href={`/services/${selectedService.slug}`}
                            >
                                Learn more about {selectedService.title.rendered}{' '}
                                <FaArrowRight />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceDesktop;