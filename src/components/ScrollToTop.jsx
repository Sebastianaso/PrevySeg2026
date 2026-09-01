import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { animateScroll as scroll } from 'react-scroll';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 600,
      smooth: 'easeInOutQuart',
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Volver arriba"
      className="fixed bottom-6 right-6 z-40 bg-[#0284c7] hover:bg-[#0369a1] text-white p-3 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-sky-400/40 cursor-pointer flex items-center justify-center animate-in fade-in zoom-in-75"
    >
      <ChevronUp size={22} strokeWidth={2.8} />
    </button>
  );
};

export default ScrollToTop;
