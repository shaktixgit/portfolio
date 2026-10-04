'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PROFILE } from '@/lib/data';
import { usePrefersReducedMotion } from '@/lib/hooks';

export function About() {
  const reducedMotion = usePrefersReducedMotion();
  const [isFlipped, setIsFlipped] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Physics for damped pendulum swing
  const angleRef = useRef(0);
  const velocityRef = useRef(0);
  const targetAngleRef = useRef(0);

  useEffect(() => {
    if (reducedMotion) return;

    let rafId: number;
    let time = 0;

    const animate = () => {
      time += 0.02;
      // Idle sway when pointer velocity is low
      const idle = Math.sin(time) * 1.2;

      // Spring physics toward targetAngle + idle
      const displacement = (targetAngleRef.current + idle) - angleRef.current;
      const spring = 0.05;
      const damping = 0.88;

      velocityRef.current += displacement * spring;
      velocityRef.current *= damping;
      angleRef.current += velocityRef.current;

      // Decay target angle back to 0
      targetAngleRef.current *= 0.94;

      if (cardRef.current) {
        cardRef.current.style.transform = `rotate(${angleRef.current.toFixed(2)}deg)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    const handlePointerMove = (e: PointerEvent) => {
      // Impulse based on horizontal movement
      const impulse = Math.max(-8, Math.min(8, e.movementX * 0.35));
      targetAngleRef.current += impulse;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('pointermove', handlePointerMove);
    }

    return () => {
      cancelAnimationFrame(rafId);
      if (container) {
        container.removeEventListener('pointermove', handlePointerMove);
      }
    };
  }, [reducedMotion]);

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFlip();
    }
  };

  return (
    <section id="about" className="section-padding bg-[#f4f2ee] relative overflow-hidden">
      <style>{`
        @keyframes strap-scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-strap {
          animation: strap-scroll 8s linear infinite;
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .transform-style-3d {
          transform-style: preserve-3d;
        }

        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .rotate-y-180 {
          transform: rotateY(180deg);
        }

        .hologram {
          background: linear-gradient(
            135deg,
            rgba(200, 200, 200, 0.4) 0%,
            rgba(255, 255, 255, 0.9) 25%,
            rgba(180, 180, 180, 0.3) 50%,
            rgba(240, 240, 240, 0.8) 75%,
            rgba(190, 190, 190, 0.5) 100%
          );
        }
      `}</style>

      <div className="site-container">
        {/* Section Heading Tag */}
        <div className="rv mb-4">
          <span className="font-mono-tag">01 — About Me</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.045em] text-[#0d0d0d] mt-2">
            The person behind the <span className="font-serif-italic text-[#77756f] font-normal">numbers.</span>
          </h2>
        </div>

        {/* Three-Column Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px_minmax(0,1fr)] gap-8 lg:gap-10 mt-12 items-stretch"
        >
          {/* Left Column: Bio & Verbatim Summary */}
          <div className="card-surface p-8 sm:p-10 flex flex-col justify-between rv">
            <div>
              <span className="font-mono text-xs text-[#a9a6a0] uppercase tracking-wider block mb-2">
                Overview
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-[#0d0d0d] mb-4">
                Hi, I'm {PROFILE.name.split(' ')[0]}.
              </h3>
              <p className="text-[#3a3a3a] text-sm sm:text-base leading-relaxed mb-4">
                {PROFILE.resumeSummary}
              </p>
              <p className="text-[#77756f] text-sm leading-relaxed">
                {PROFILE.extraLine}
              </p>
            </div>

            <div className="pt-8 border-t border-[rgba(13,13,13,0.08)] flex flex-wrap gap-3 mt-6">
              <a
                href={PROFILE.resumePath}
                download
                className="btn-primary text-xs !h-10 px-4"
              >
                Résumé ↓
              </a>
              {PROFILE.github && (
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-xs !h-10 px-4"
                >
                  GitHub ↗
                </a>
              )}
              {PROFILE.linkedin && (
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-xs !h-10 px-4"
                >
                  LinkedIn ↗
                </a>
              )}
            </div>
          </div>

          {/* Centre Column: Hanging Lanyard ID Card */}
          <div className="flex flex-col items-center justify-start rv" style={{ '--i': 1 } as React.CSSProperties}>
            {/* Lanyard Top Attachment & Strap */}
            <div className="w-[30px] h-[56px] relative overflow-hidden bg-[#0d0d0d] rounded-t-sm flex flex-col items-center border-x border-[#3a3a3a]">
              <div className="animate-strap flex flex-col items-center whitespace-nowrap text-[8px] font-mono font-medium text-neutral-300 py-1 tracking-widest uppercase">
                <span className="mb-2">SPM · DATA</span>
                <span className="mb-2">SPM · DATA</span>
                <span className="mb-2">SPM · DATA</span>
                <span className="mb-2">SPM · DATA</span>
              </div>
            </div>

            {/* Metal Swivel Clip */}
            <div className="w-8 h-4 bg-gradient-to-b from-neutral-300 to-neutral-400 rounded-sm border border-neutral-500 shadow-sm flex items-center justify-center -mt-0.5 z-10">
              <div className="w-3 h-1 bg-neutral-600 rounded-full" />
            </div>

            {/* Pendulum Swinging Wrap */}
            <div
              ref={cardRef}
              className="origin-top transition-transform duration-75 mt-1"
            >
              {/* Interactive 3D Card Container */}
              <div
                tabIndex={0}
                role="button"
                aria-label="Developer ID Card. Press Enter to flip."
                onMouseEnter={() => setIsFlipped(true)}
                onMouseLeave={() => setIsFlipped(false)}
                onClick={toggleFlip}
                onKeyDown={handleKeyDown}
                className="relative w-[300px] h-[404px] cursor-pointer perspective-1000 outline-none focus-visible:ring-2 focus-visible:ring-[#0d0d0d] rounded-[24px]"
              >
                <div
                  className={`w-full h-full relative transition-transform duration-700 transform-style-3d ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* FRONT FACE */}
                  <div className="absolute inset-0 w-full h-full bg-white rounded-[24px] p-5 flex flex-col justify-between shadow-[0_12px_32px_-8px_rgba(0,0,0,0.12)] border border-[rgba(13,13,13,0.1)] backface-hidden">
                    {/* Top band */}
                    <div className="w-full bg-[#0d0d0d] text-white py-1.5 px-3 rounded-xl flex items-center justify-between font-mono text-[10px] tracking-wider uppercase">
                      <span>DEVELOPER ID</span>
                      <span className="text-neutral-400">ITER / SOA</span>
                    </div>

                    {/* Centred Portrait with halo */}
                    <div className="flex flex-col items-center my-auto">
                      <div className="relative group/pic w-[128px] h-[156px] rounded-2xl overflow-hidden p-1 bg-gradient-to-b from-neutral-200 to-neutral-300 shadow-inner">
                        <div className="w-full h-full rounded-[12px] overflow-hidden bg-white">
                          <img
                            src="/portrait-bust.webp"
                            alt={PROFILE.name}
                            width={128}
                            height={156}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover/pic:scale-105"
                          />
                        </div>
                      </div>

                      {/* Name & Role */}
                      <div className="text-center mt-3">
                        <div className="font-bold text-base tracking-tight text-[#0d0d0d]">
                          {PROFILE.name}
                        </div>
                        <div className="font-mono text-[11px] text-[#77756f]">
                          {PROFILE.role}
                        </div>
                      </div>
                    </div>

                    {/* Meta rows */}
                    <div className="border-t border-[rgba(13,13,13,0.08)] pt-2.5 grid grid-cols-3 gap-1 font-mono text-[9px] text-[#77756f]">
                      <div>
                        <span className="block text-[#a9a6a0]">ID NO.</span>
                        <span className="text-[#0d0d0d] font-semibold">{PROFILE.idCard.idNo}</span>
                      </div>
                      <div>
                        <span className="block text-[#a9a6a0]">DEPT.</span>
                        <span className="text-[#0d0d0d] font-semibold">{PROFILE.idCard.dept}</span>
                      </div>
                      <div>
                        <span className="block text-[#a9a6a0]">VALID TILL</span>
                        <span className="text-[#0d0d0d] font-semibold">{PROFILE.idCard.validTill}</span>
                      </div>
                    </div>

                    {/* Barcode & Holographic Sticker */}
                    <div className="pt-2 flex items-center justify-between border-t border-[rgba(13,13,13,0.08)]">
                      {/* Stylized CSS Barcode */}
                      <div className="flex items-center gap-[2px] h-6">
                        <div className="w-[2px] h-full bg-[#0d0d0d]" />
                        <div className="w-[1px] h-full bg-[#0d0d0d]" />
                        <div className="w-[3px] h-full bg-[#0d0d0d]" />
                        <div className="w-[1px] h-full bg-[#0d0d0d]" />
                        <div className="w-[2px] h-full bg-[#0d0d0d]" />
                        <div className="w-[4px] h-full bg-[#0d0d0d]" />
                        <div className="w-[1px] h-full bg-[#0d0d0d]" />
                        <div className="w-[2px] h-full bg-[#0d0d0d]" />
                        <div className="w-[3px] h-full bg-[#0d0d0d]" />
                        <div className="w-[1px] h-full bg-[#0d0d0d]" />
                      </div>

                      {/* Holographic badge */}
                      <div className="hologram w-9 h-6 rounded-md border border-neutral-300 shadow-xs flex items-center justify-center text-[7px] font-mono font-bold text-neutral-600">
                        SECURE
                      </div>
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div className="absolute inset-0 w-full h-full bg-[#0d0d0d] text-white rounded-[24px] p-6 flex flex-col justify-between shadow-[0_12px_32px_-8px_rgba(0,0,0,0.25)] border border-neutral-800 rotate-y-180 backface-hidden">
                    <div>
                      <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest block mb-4">
                        What I Am
                      </span>
                      <ul className="space-y-2.5 text-xs text-neutral-300">
                        <li className="flex items-start gap-2">
                          <span className="text-neutral-500 font-mono">01</span>
                          <span><strong>Role:</strong> {PROFILE.role}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-neutral-500 font-mono">02</span>
                          <span><strong>Academics:</strong> {PROFILE.idCard.degree} · {PROFILE.idCard.cgpa}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-neutral-500 font-mono">03</span>
                          <span><strong>Projects:</strong> AI SaaS Optimizer, Satyam Verify, 5G Analysis</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-neutral-500 font-mono">04</span>
                          <span><strong>Honours:</strong> SIH 2026 Top 100 Finalist & Caselet 53 Winner</span>
                        </li>
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-neutral-800">
                      <div className="font-serif-italic text-sm text-neutral-300 tracking-wide mb-1">
                        Shakti Pad Mahato
                      </div>
                      <div className="font-mono text-[9px] text-neutral-500">
                        If found, say hello · {PROFILE.email}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center font-mono text-[10px] text-[#a9a6a0] mt-2">
                Hover or tap to flip card
              </div>
            </div>
          </div>

          {/* Right Column: Quick Facts & Quote */}
          <div className="card-surface p-8 sm:p-10 flex flex-col justify-between rv" style={{ '--i': 2 } as React.CSSProperties}>
            <div>
              <span className="font-mono text-xs text-[#a9a6a0] uppercase tracking-wider block mb-4">
                Quick Facts
              </span>
              <div className="divide-y divide-[rgba(13,13,13,0.06)]">
                {PROFILE.facts.map((fact, idx) => (
                  <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <span className="font-mono text-xs text-[#77756f]">{fact.label}</span>
                    <span className="text-xs sm:text-sm font-medium text-[#0d0d0d]">{fact.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[rgba(13,13,13,0.08)] mt-6">
              <span className="font-mono text-[10px] text-[#a9a6a0] block uppercase mb-1">
                Statement of Focus
              </span>
              <p className="text-sm font-serif-italic text-[#3a3a3a] leading-snug">
                "{PROFILE.quote}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
