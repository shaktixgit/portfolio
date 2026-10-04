'use client';

import React, { useRef, useState, useEffect } from 'react';
import { TIMELINE } from '@/lib/data';

export function Experience() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;

      // Start progressing when top enters middle of viewport, finish near bottom
      const start = windowHeight * 0.7;
      const end = windowHeight * 0.3;
      const totalDistance = elementHeight + (start - end);
      const current = start - rect.top;

      const progress = Math.max(0, Math.min(1, current / totalDistance));
      setScrollProgress(progress);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section id="experience" className="section-padding bg-[#f4f2ee] relative">
      <div className="site-container">
        {/* Section Heading Tag */}
        <div className="rv mb-12">
          <span className="font-mono-tag">05 — Experience & Education</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.045em] text-[#0d0d0d] mt-2">
            The path of continuous <span className="font-serif-italic text-[#77756f] font-normal">growth.</span>
          </h2>
        </div>

        {/* Timeline Container with Drawing Spine */}
        <div ref={containerRef} className="relative max-w-3xl mx-auto py-8">
          {/* Background Spine Track */}
          <div className="absolute top-0 bottom-0 left-4 sm:left-1/2 w-[2px] bg-[rgba(13,13,13,0.1)] -translate-x-1/2" />

          {/* Active Drawing Spine */}
          <div
            className="absolute top-0 left-4 sm:left-1/2 w-[2px] bg-[#0d0d0d] -translate-x-1/2 origin-top transition-transform duration-75"
            style={{
              height: '100%',
              transform: `scaleY(${scrollProgress})`,
            }}
          />

          <div className="space-y-12 sm:space-y-16">
            {TIMELINE.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const threshold = (idx + 0.3) / (TIMELINE.length + 1);
              const isLit = scrollProgress >= threshold;

              return (
                <div
                  key={idx}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Spine Stop Circle */}
                  <div
                    className={`absolute top-6 left-4 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 transition-all duration-300 z-10 ${
                      isLit
                        ? 'bg-[#0d0d0d] border-[#0d0d0d] scale-110 shadow-[0_0_12px_rgba(13,13,13,0.3)]'
                        : 'bg-[#f4f2ee] border-neutral-400 scale-90'
                    }`}
                  />

                  {/* Content Card */}
                  <div
                    className={`w-full sm:w-[calc(50%-32px)] pl-12 sm:pl-0 ${
                      isEven ? 'sm:text-right sm:pr-8' : 'sm:text-left sm:pl-8'
                    }`}
                  >
                    <div
                      className={`card-surface p-6 sm:p-7 border transition-all duration-400 ${
                        isLit
                          ? 'border-[rgba(13,13,13,0.2)] shadow-[0_12px_32px_-8px_rgba(13,13,13,0.08)] -translate-y-1'
                          : 'border-[rgba(13,13,13,0.06)] opacity-85'
                      }`}
                    >
                      <div
                        className={`flex flex-wrap items-center gap-2 mb-2 ${
                          isEven ? 'sm:justify-end' : 'sm:justify-start'
                        }`}
                      >
                        <span className="font-mono text-xs text-[#77756f] font-semibold">
                          {item.year}
                        </span>
                        {item.badge && (
                          <span className="px-2 py-0.5 rounded-full font-mono text-[10px] bg-[#0d0d0d] text-white">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-[#0d0d0d] tracking-tight">
                        {item.title}
                      </h3>

                      <div className="font-mono text-xs text-[#3a3a3a] font-medium mt-1 mb-3">
                        {item.place}
                      </div>

                      <ul className="space-y-1.5 text-xs text-[#77756f] leading-relaxed">
                        {item.details.map((detail, dIdx) => (
                          <li key={dIdx}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* End Card: Dashed "Next — Your team?" */}
            <div className="relative flex flex-col items-center justify-center pt-8">
              <div className="absolute top-12 left-4 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-dashed border-[#0d0d0d] bg-white z-10" />

              <div className="w-full sm:w-[calc(50%-32px)] pl-12 sm:pl-0 sm:mx-auto">
                <div className="p-7 rounded-[26px] border-2 border-dashed border-[rgba(13,13,13,0.2)] bg-transparent text-center hover:border-[#0d0d0d] transition-colors">
                  <span className="font-mono text-xs text-[#a9a6a0] uppercase block mb-1">
                    Future Opportunity
                  </span>
                  <h3 className="text-xl font-bold text-[#0d0d0d] tracking-tight mb-2">
                    Next — Your team?
                  </h3>
                  <p className="text-xs text-[#77756f] mb-4">
                    Ready to deploy predictive modeling, business intelligence, and scalable analytics to solve high-impact problems.
                  </p>
                  <a href="#contact" className="btn-primary text-xs !h-9 px-4 inline-flex">
                    Get in touch →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
