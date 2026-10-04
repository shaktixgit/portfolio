'use client';

import { useEffect } from 'react';

/**
 * Global RevealObserver that detects elements with .rv or .rv-mask
 * and adds the .is-in class once they intersect.
 */
export function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const elements = document.querySelectorAll('.rv, .rv-mask');
    elements.forEach((el) => observer.observe(el));

    // Also observe mutations in case dynamic elements mount
    const mutationObserver = new MutationObserver(() => {
      const newElements = document.querySelectorAll('.rv:not(.is-in), .rv-mask:not(.is-in)');
      newElements.forEach((el) => observer.observe(el));
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
