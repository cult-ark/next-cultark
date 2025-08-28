// Carousel.tsx
import React from 'react';
import Image from 'next/image';

interface CarouselProps {
    items: string[]; // e.g., image URLs or text
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
    // Duplicate items for seamless infinite scroll
    const duplicatedItems = [...items, ...items];

    return (
        <div className='w-full overflow-hidden relative'>
            <div className='flex animate-scroll whitespace-nowrap'>
                {duplicatedItems.map((item, index) => (
                    <div key={index} className='flex-shrink-0 w-80 md:w-96 bg-white mx-2 p-3 rounded flex items-center justify-center relative h-24'>
                        <Image
                            src={item}
                            alt={`Client ${index + 1}`}
                            fill
                            className='object-contain'
                            sizes="(max-width: 768px) 320px, 384px"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;