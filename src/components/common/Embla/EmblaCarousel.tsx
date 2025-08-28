'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Image from 'next/image';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useAutoplay } from './EmblaCarouselAutoplay';
import {
    NextButton,
    PrevButton,
    usePrevNextButtons,
} from './EmblaCarouselArrowButtons';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import '@/styles/embla.css';

type PropType = {
    slides: number[];
    options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
    const { options } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [
        Autoplay({ playOnInit: true, delay: 2000 }),
    ]);

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    } = usePrevNextButtons(emblaApi);

    const { onAutoplayButtonClick } = useAutoplay(emblaApi);

    const { data: clients } = useQuery({
        queryKey: ['clients'],
        queryFn: async () => {
            try {
                const res = await axios({
                    url: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wp/v2/clients?_fields=title,featured_media,date`,
                });
                const imgs: string[] = [];
                await Promise.all(
                    res.data.map(async (c: any) => {
                        const img: any = await axios.get(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wp/v2/media/${c.featured_media}`);
                        imgs.push(img.data.source_url);
                    })
                );

                return imgs;
            } catch (error) {
                console.error('Failed to fetch clients:', error);
                return [];
            }
        },
        initialData: [] // Provide empty array as initial data
    });

    return (
        <div className='embla !w-[100vw]'>
            <div className='overflow-hidden bg-blue-300 w-full' ref={emblaRef}>
                <div className='embla__container bg-red-600'>
                    {Array.isArray(clients) && clients.map((m, index) => (
                        <div className='embla__slide' key={index}>
                            <div className='embla__slide__number relative'>
                                <Image
                                    src={`${m}`}
                                    alt={`Client ${index + 1}`}
                                    fill
                                    className='p-5 px-8 object-contain bg-white'
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='flex items-center justify-between gap-5 !w-full'>
                <PrevButton
                    onClick={() => onAutoplayButtonClick(onPrevButtonClick)}
                    disabled={prevBtnDisabled}
                />
                <NextButton
                    onClick={() => onAutoplayButtonClick(onNextButtonClick)}
                    disabled={nextBtnDisabled}
                />
            </div>

            {/* <div
          className={`embla__progress`.concat(
            showAutoplayProgress ? '' : ' embla__progress--hidden'
          )}
        >
          <div className='embla__progress__bar' ref={progressNode} />
        </div> */}

            {/* <button className='embla__play' onClick={toggleAutoplay} type='button'>
          {autoplayIsPlaying ? 'Stop' : 'Start'}
        </button> */}
        </div>
    );
};

export default EmblaCarousel;