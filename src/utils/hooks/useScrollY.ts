import { useState, useEffect } from 'react';

export const useScrollY = () => {
  const [scrollY, setScrollY] = useState(0);
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set client-side flag to prevent hydration mismatch
    setIsClient(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      // Update scrollY on resize as it might affect the value
      setScrollY(window.scrollY);
    };

    // Set initial values only on client
    setScrollY(window.scrollY);
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    scrollY,
    windowSize,
    isScrolled: scrollY > 50,
    isMobile: isClient ? windowSize.width < 768 : false,
    isTablet: isClient ? windowSize.width >= 768 && windowSize.width < 1024 : false,
    isDesktop: isClient ? windowSize.width >= 1024 : false,
    isClient,
  };
};