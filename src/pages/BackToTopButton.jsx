import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ArrowUp } from 'lucide-react';

gsap.registerPlugin(ScrollToPlugin);

export default function BackToTopButton() {
    const [isVisible, setIsVisible] = useState(false);
    const buttonRef = useRef(null);
  
    useEffect(() => {
      const onScroll = () => {
        const shouldBeVisible = window.scrollY > 300;
        if (shouldBeVisible && !isVisible) {
          setIsVisible(true);
          animatePulse(); // animation d'entrée
        } else if (!shouldBeVisible && isVisible) {
          setIsVisible(false);
        }
      };
  
      const animatePulse = () => {
        gsap.fromTo(
          buttonRef.current,
          { scale: 1 },
          { scale: 1.1, yoyo: true, repeat: 3, duration: 0.3, ease: 'power1.inOut' }
        );
      };
  
      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
    }, [isVisible]);
  
    const scrollToTop = () => {
      gsap.to(window, {
        scrollTo: { y: 0 },
        duration: 1,
        ease: 'power2.inOut',
      });
    };

  return (
    <button className='scroll_top'
    ref={buttonRef}
      onClick={scrollToTop}
      style={{ opacity: isVisible ? '1' : '0', pointerEvents: isVisible ? 'all' : 'none' }}
    
    >
      <ArrowUp size={24} color='white' />
    </button>
  );
}
