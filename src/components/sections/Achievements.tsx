'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ACHIEVEMENTS, AchievementItem } from '@/lib/data';
import { TechLogo } from '@/components/ui/TechLogo';
import { usePrefersReducedMotion } from '@/lib/hooks';

export function Achievements() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;

      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
      setScrollProgress(progress);

      const maxTranslate = track.scrollWidth - window.innerWidth + 96;
      if (maxTranslate > 0 && !reducedMotion) {
        track.style.transform = `translateX(-${progress * maxTranslate}px)`;
      }

      // Determine card nearest to center
      const cards = track.querySelectorAll<HTMLElement>('.achievement-card');
      const centerX = window.innerWidth / 2;
      let closestIdx = 0;
      let minDistance = Infinity;

      cards.forEach((card, idx) => {
        const cRect = card.getBoundingClientRect();
        const cardCenter = cRect.left + cRect.width / 2;
        const dist = Math.abs(cardCenter - centerX);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = idx;
        }
      });

      setActiveCardIndex(closestIdx);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [reducedMotion]);

  return (
    <section
      id="achievements"
      ref={containerRef}
      className="relative bg-[#f4f2ee] h-[260vh]"
    >
      {/* Pinned 100svh Viewport */}
      <div className="sticky top-0 h-[100svh] w-full flex flex-col justify-between overflow-hidden py-10 sm:py-14">
        {/* Header with Title and Thin Progress Bar */}
        <div className="site-container w-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
            <div>
              <span className="font-mono-tag">06 — Achievements & Recognition</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.045em] text-[#0d0d0d] mt-2">
                Milestones & <span className="font-serif-italic text-[#77756f] font-normal">honours.</span>
              </h2>
            </div>

            {/* Gallery counter */}
            <div className="font-mono text-xs text-[#77756f]">
              <span className="text-[#0d0d0d] font-bold">0{activeCardIndex + 1}</span> / 0{ACHIEVEMENTS.length}
            </div>
          </div>

          {/* Thin Progress Bar in Header */}
          <div className="w-full h-[2px] bg-[rgba(13,13,13,0.08)] rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-[#0d0d0d] transition-all duration-75"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>

        {/* Horizontal Track of Landscape Cards */}
        <div
          ref={trackRef}
          className="flex items-center gap-6 sm:gap-8 px-6 sm:px-16 my-auto w-max transition-transform duration-75 will-change-transform"
        >
          {ACHIEVEMENTS.map((card, idx) => {
            const isCenter = idx === activeCardIndex;
            return (
              <div
                key={idx}
                className={`achievement-card relative flex-shrink-0 w-[clamp(340px,40vw,540px)] h-[clamp(260px,36vh,310px)] bg-white rounded-[28px] p-7 sm:p-9 flex flex-col justify-between transition-all duration-500 ${
                  isCenter
                    ? '-translate-y-3 shadow-[0_28px_60px_-16px_rgba(13,13,13,0.16)]'
                    : 'translate-y-0 shadow-[0_8px_30px_-6px_rgba(13,13,13,0.06)]'
                }`}
                style={{
                  boxShadow: isCenter
                    ? `0 28px 60px -16px rgba(13,13,13,0.16), 0 0 32px 0 ${card.brandColorGlow}`
                    : undefined,
                }}
              >
                {/* Top: 72px Logo Tile + Index */}
                <div className="flex items-start justify-between">
                  <div
                    className="w-[72px] h-[72px] rounded-2xl bg-[#f4f2ee] p-3.5 flex items-center justify-center relative shadow-inner"
                    style={{
                      backgroundColor: isCenter ? '#ffffff' : '#f4f2ee',
                      boxShadow: `0 0 20px 4px ${card.brandColorGlow}`,
                    }}
                  >
                    <TechLogo brandKey={card.brandKey} size={44} />
                  </div>

                  <span className="font-mono text-xs font-semibold text-[#a9a6a0]">
                    {card.index}
                  </span>
                </div>

                {/* Bottom: Info on Left, Huge Animated Counter on Right */}
                <div className="flex items-end justify-between gap-4 pt-4 border-t border-[rgba(13,13,13,0.06)]">
                  <div className="max-w-[65%]">
                    <span className="font-mono text-[10px] text-[#77756f] uppercase tracking-wider block mb-1">
                      {card.label}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0d0d0d] tracking-tight mb-1">
                      {card.caption}
                    </h3>
                    <p className="text-xs text-[#77756f] line-clamp-2">
                      {card.detail}
                    </p>
                  </div>

                  {/* Huge Number Counter */}
                  <div className="text-right select-none">
                    <CountUp
                      target={card.metricNumber}
                      suffix={card.metricSuffix}
                      active={isCenter}
                    />
                  </div>
                </div>
              </div>
            );
          })}

          {/* End cap: "and counting →" */}
          <div className="flex-shrink-0 px-8 py-12 flex items-center gap-3 font-serif-italic text-2xl text-[#77756f]">
            <span>and counting</span>
            <span className="font-sans text-xl">→</span>
          </div>
        </div>

        {/* Footer Sub-indicator */}
        <div className="site-container w-full flex justify-between items-center text-xs font-mono text-[#a9a6a0]">
          <span>Horizontal travel · Scroll to navigate</span>
          <span>Pinned Gallery</span>
        </div>
      </div>
    </section>
  );
}

function CountUp({
  target,
  suffix,
  active,
}: {
  target: number;
  suffix: string;
  active: boolean;
}) {
  const [current, setCurrent] = useState(0);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (active && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      const duration = 1400; // 1.4s
      const startTime = performance.now();

      const easeOutQuart = (x: number) => 1 - Math.pow(1 - x, 4);

      const frame = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const val = Math.floor(easeOutQuart(progress) * target);
        setCurrent(val);

        if (progress < 1) {
          requestAnimationFrame(frame);
        } else {
          setCurrent(target);
        }
      };

      requestAnimationFrame(frame);
    }
  }, [active, target]);

  return (
    <div className="font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tighter text-[#0d0d0d] leading-none">
      {suffix === 'Top' ? (
        <span>
          <span className="text-xl sm:text-2xl font-mono text-[#77756f] mr-1">#</span>
          {current || target}
        </span>
      ) : suffix === '#' ? (
        <span>
          <span className="text-xl sm:text-2xl font-mono text-[#77756f] mr-1">#</span>
          {current || target}
        </span>
      ) : (
        <span>
          {current || target}
          <span className="text-xl sm:text-2xl font-normal text-[#77756f] ml-0.5">
            {suffix}
          </span>
        </span>
      )}
    </div>
  );
}
