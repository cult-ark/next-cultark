'use client';

// Carousel.tsx
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface CarouselProps {
    items: string[]; // e.g., image URLs or text
    height?: string; // Custom height for carousel items
    className?: string; // Additional className for customization
}

const Carousel: React.FC<CarouselProps> = ({ 
    items, 
    height = 'h-64', // Increased default height from h-24 to h-64
    className = '' 
}) => {
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    
    // Duplicate items for seamless infinite scroll
    const duplicatedItems = [...items, ...items];

    const handleImageLoad = (index: number) => {
        setLoadedImages(prev => new Set(prev).add(index));
    };

    // Auto-scroll functionality for infinite effect
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        let animationFrameId: number;
        let startTime: number | null = null;
        const duration = 30000; // 30 seconds for full scroll
        
        const animateScroll = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            
            if (progress < duration) {
                const scrollPosition = (progress / duration) * container.scrollWidth;
                container.scrollLeft = scrollPosition;
                animationFrameId = requestAnimationFrame(animateScroll);
            } else {
                // Reset for infinite loop
                startTime = timestamp;
                animationFrameId = requestAnimationFrame(animateScroll);
            }
        };

        // Start animation
        animationFrameId = requestAnimationFrame(animateScroll);
        
        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, []);

    return (
        <div className={`w-full overflow-hidden relative ${className}`}>
            <div 
                ref={scrollContainerRef}
                className='flex whitespace-nowrap'
                style={{
                    animation: 'scroll 10s linear infinite',
                    WebkitAnimation: 'scroll 10s linear infinite'
                }}
            >
                {duplicatedItems.map((item, index) => {
                    const originalIndex = index % items.length;
                    const isLoaded = loadedImages.has(originalIndex);
                    
                    return (
                        <div 
                            key={index} 
                            className={`flex-shrink-0 w-80 md:w-96 bg-white mx-2 p-4 rounded-lg flex items-center justify-center relative ${height}`}
                        >
                            <div className="relative w-full h-full flex items-center justify-center">
                                {item ? (
                                    <Image
                                        src={item}
                                        alt={`Client ${originalIndex + 1}`}
                                        fill
                                        className={`object-contain transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-70'}`}
                                        sizes="(max-width: 768px) 320px, (max-width: 1024px) 384px, 448px"
                                        onLoad={() => handleImageLoad(originalIndex)}
                                        priority={originalIndex === 0} // Prioritize first image
                                    />
                                ) : (
                                    <div className="text-gray-400 text-sm">
                                        No image available
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {/* Add CSS animation for smooth scrolling */}
            <style jsx global>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-100%);
                    }
                }
            `}</style>
        </div>
    );
};

export default Carousel;