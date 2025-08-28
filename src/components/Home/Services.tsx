'use client'

import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getServices } from '@/services/cultark-services';
import Service from '@/types/Service';
import ServiceDesktop from './ServiceDesktop';
import ServicesMobile from './ServicesMobile';

const Services = () => {
    const limit = 5;
    const { data: services, isLoading, error } = useQuery<Service[]>({
        queryKey: ['services', limit],
        queryFn: async () => await getServices(limit),
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    });
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [buttonsHeight, setButtonsHeight] = useState(0);
    const [selectedService, setSelectedService] = useState(
        services && services![0]
    );

    useEffect(() => {
        if (buttonRef.current) {
            setButtonsHeight(buttonRef.current.getBoundingClientRect().height);
        }
        if (services) setSelectedService(services[0]);
    }, [services]);
    return (
        <div className='my-10 lg:mt-28 overflow-x-hidden'>
            <div className='xl:flex xl:items-start xl:gap-6'>
                <div className='xl:flex-shrink-0'>
                    <div className='bg-cultark-blue uppercase text-cultark-white rounded-r-xl xl:px-4 py-4 xl:py-6 px-6 xl:text-vertical-lr w-2/3 xl:w-auto text-center mb-5 xl:mb-8'>
                        <p className='xl:rotate-180'>what we do</p>
                    </div>
                </div>

                <div className='px-6 max-w-[110rem] mx-auto xl:flex-1 xl:px-0 xl:mx-0'>
                    <h2 className='text-h2 font-light text-width-max'>
                        The Magic Within the Cult
                    </h2>
                    <p className='text-16 lg:w-3/5 font-light'>
                        We don't follow trends—we shape them. Every strategy, every campaign,
                        and every creative piece we build is designed to leave an impact. If
                        it doesn't drive results, we don't do it.
                    </p>

                    <ServiceDesktop
                        services={services || []}
                        isLoading={isLoading}
                        selectedService={selectedService}
                        setSelectedService={setSelectedService}
                        buttonsHeight={buttonsHeight + 'px'}
                    />

                    <ServicesMobile
                        services={services || []}
                        isLoading={isLoading}
                        selectedService={selectedService}
                        setSelectedService={setSelectedService}
                        buttonsHeight={buttonsHeight + 'px'}
                    />
                </div>
            </div>
        </div>
    );
};

export default Services;