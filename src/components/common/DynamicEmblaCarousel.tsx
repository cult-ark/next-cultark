'use client';

import { Suspense, lazy } from 'react';
import { EmblaOptionsType } from 'embla-carousel';

// Dynamically import Embla carousel
const EmblaCarousel = lazy(() => import('./Embla/EmblaCarousel'));

type PropType = {
    slides: number[];
    options?: EmblaOptionsType;
};

const DynamicEmblaCarousel = (props: PropType) => {
    return (
        <Suspense fallback={
            <div className="embla !w-[100vw] animate-pulse">
                <div className="overflow-hidden bg-gray-200 w-full h-32 rounded-lg">
                    <div className="flex space-x-4 p-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-gray-300 rounded w-24 h-16 flex-shrink-0" />
                        ))}
                    </div>
                </div>
            </div>
        }>
            <EmblaCarousel {...props} />
        </Suspense>
    );
};

export default DynamicEmblaCarousel;