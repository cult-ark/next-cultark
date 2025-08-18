// Carousel.tsx
import React from 'react';

interface CarouselProps {
    items: string[]; // e.g., image URLs or text
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
    return (
        <div className='w-full overflow-hidden relative'>
            <div className='flex animate-scroll whitespace-nowrap'>
                {items.map((item, index) => (
                    <img
                        key={index}
                        src={item}
                        alt={`Client ${index + 1}`}
                        className='flex-shrink-0 object-contain w-80 md:w-96 bg-white m-2 p-3 rounded flex items-center justify-center'
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;