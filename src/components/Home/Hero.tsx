'use client'

import { useEffect, useState } from "react";
import Image from 'next/image';

const Hero = () => {
    const flipTexts = [
        "PERFORMANCE MARKETING",
        "SEO",
        "MEDIA PRODUCTION",
        "DESIGN & PRODUCTION",
        "DIGITAL PRODUCTS",
        "CULTARK"
    ];

    const [currentText, setCurrentText] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentText((prev) => (prev + 1) % flipTexts.length);
                setIsAnimating(false);
            }, 500);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-screen w-full flex flex-col items-center justify-center font-manrope pt-16 sm:pt-20 md:pt-24 lg:pt-28 overflow-hidden">
            {/* Background Video */}
            <video
                className="absolute top-0 left-0 w-full h-full z-0
                   object-cover object-center
                   min-w-full min-h-full"
                src="/images/OriginalVideo.mp4"
                autoPlay
                loop
                muted
                playsInline
                poster="/images/cultark-logo.png"
            />

            <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10" />

            <div className="relative z-20 flex flex-col items-center text-center w-full">
                <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold mb-6 sm:mb-8 md:mb-10 uppercase px-4">
                    Your Business Needs
                </h1>

                <div className="min-h-[40px] sm:min-h-[50px] md:min-h-[60px] lg:min-h-[70px] flex items-center justify-center w-full px-4">
                    <div className={`flex items-center justify-center transform transition-all duration-500 ease-in-out
            ${isAnimating
                            ? 'opacity-0 -translate-y-4 scale-95'
                            : 'opacity-100 translate-y-0 scale-100'
                        }`}
                    >
                        {currentText === flipTexts.length - 1 ? (
                            // Company name with logo version
                            <>
                                <Image
                                    src="/images/cultark-logo.png"
                                    alt="Company Logo"
                                    width={96}
                                    height={96}
                                    className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16 mr-2 sm:mr-3"
                                    priority
                                    sizes="(max-width: 640px) 32px, (max-width: 768px) 40px, (max-width: 1024px) 48px, (max-width: 1280px) 56px, 64px"
                                />
                                <span className="text-white font-archivo uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-extrabold">
                                    CULTARK
                                </span>
                            </>
                        ) : (
                            // Regular text version
                            <span className="text-white font-archivo uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-extrabold text-center">
                                {flipTexts[currentText]}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;