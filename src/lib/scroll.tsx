'use client';

import React, { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { usePrefersReducedMotion } from './hooks';

interface ScrollContextType {
  lenis: Lenis | null;
  scrollToTarget: (target: string | HTMLElement, offset?: number) => void;
}

const ScrollContext = createContext<ScrollContextType>({
  lenis: null,
  scrollToTarget: () => {},
});

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  const scrollToTarget = (target: string | HTMLElement, offset = 0) => {
    if (lenisRef.current && !reducedMotion) {
      lenisRef.current.scrollTo(target, { offset, duration: 1.2 });
    } else {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior: reducedMotion ? 'auto' : 'smooth' });
      }
    }
  };

  return (
    <ScrollContext.Provider value={{ lenis: lenisRef.current, scrollToTarget }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScroll() {
  return useContext(ScrollContext);
}
