import { useEffect, useState } from "react";

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
        poster="/images/video-poster.jpg"
      />

      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10" />

      <div className="relative z-20 flex flex-col items-center text-center w-full">
        <h1 className="text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 sm:mb-8 md:mb-10 uppercase px-4">
          Your Business Needs
        </h1>

        <div className="min-h-[60px] sm:min-h-[80px] md:min-h-[100px] lg:min-h-[120px] flex items-center justify-center w-full px-4">
          <div className={`flex items-center justify-center transform transition-all duration-500 ease-in-out
            ${isAnimating
              ? 'opacity-0 -translate-y-4 scale-95'
              : 'opacity-100 translate-y-0 scale-100'
            }`}
          >
            {currentText === flipTexts.length - 1 ? (
              // Company name with logo version
              <>
                <img
                  src="/images/cultark-logo.png"
                  alt="Company Logo"
                  className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 xl:h-28 xl:w-28 mr-3 sm:mr-4"
                />
                <span className="text-white font-archivo uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold">
                  CULTARK
                </span>
              </>
            ) : (
              // Regular text version
              <span className="text-white font-archivo uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-center">
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