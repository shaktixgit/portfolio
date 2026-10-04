'use client';

import React, { useState } from 'react';
import { PROFILE } from '@/lib/data';
import { useScroll } from '@/lib/scroll';

export function Contact() {
  const { scrollToTarget } = useScroll();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const headingLine1 = "Let's build";
  const headingLine2 = "something together.";

  return (
    <footer id="contact" className="section-padding bg-[#f4f2ee] border-t border-[rgba(13,13,13,0.1)] relative">
      <style>{`
        .letter-hop {
          display: inline-block;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .letter-hop:hover {
          transform: translateY(-10px);
        }

        @keyframes badge-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: badge-spin 16s linear infinite;
        }
      `}</style>

      <div className="site-container">
        {/* Section Heading Tag */}
        <div className="rv mb-10">
          <span className="font-mono-tag">07 — Contact</span>
        </div>

        {/* Huge Interactive Heading with Bouncing Letters */}
        <div className="mb-14 rv select-none">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.045em] text-[#0d0d0d] leading-[1.05]">
            <span className="block">
              {headingLine1.split('').map((char, i) => (
                <span key={i} className="letter-hop">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
            <span className="block text-[#77756f]">
              {headingLine2.split(' ').slice(0, 1).join('').split('').map((char, i) => (
                <span key={i} className="letter-hop">
                  {char}
                </span>
              ))}{' '}
              <span className="font-serif-italic font-normal">
                {headingLine2.split(' ').slice(1).join(' ').split('').map((char, i) => (
                  <span key={i} className="letter-hop">
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>
            </span>
          </h2>
        </div>

        {/* Contact Links & Circular Badge */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-end mb-20 rv">
          <div className="space-y-8">
            {/* Email link + Copy chip */}
            <div>
              <span className="font-mono text-xs text-[#a9a6a0] uppercase tracking-wider block mb-2">
                Direct Email
              </span>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#0d0d0d] underline decoration-[rgba(13,13,13,0.3)] hover:decoration-[#0d0d0d] transition-all"
                >
                  {PROFILE.email}
                </a>

                <button
                  type="button"
                  onClick={copyEmail}
                  className="px-3.5 py-1.5 rounded-full font-mono text-xs border border-[rgba(13,13,13,0.15)] bg-white hover:bg-[#0d0d0d] hover:text-white transition-all shadow-xs"
                  aria-label="Copy email address"
                >
                  {copied ? 'Copied ✓' : 'Copy'}
                </button>
              </div>

              {/* Screen reader announcement */}
              <div aria-live="polite" className="sr-only">
                {copied ? 'Email copied to clipboard' : ''}
              </div>
            </div>

            {/* Phone, GitHub, LinkedIn */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-10 pt-4 font-mono text-sm text-[#0d0d0d]">
              <div>
                <span className="text-[#a9a6a0] text-xs block mb-1">PHONE</span>
                <a
                  href={PROFILE.phoneHref}
                  className="hover:underline underline-offset-4"
                >
                  {PROFILE.phone}
                </a>
              </div>

              {PROFILE.github && (
                <div>
                  <span className="text-[#a9a6a0] text-xs block mb-1">GITHUB</span>
                  <a
                    href={PROFILE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline underline-offset-4 inline-flex items-center gap-1"
                  >
                    @shaktixgit ↗
                  </a>
                </div>
              )}

              {PROFILE.linkedin && (
                <div>
                  <span className="text-[#a9a6a0] text-xs block mb-1">LINKEDIN</span>
                  <a
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline underline-offset-4 inline-flex items-center gap-1"
                  >
                    @shaktixlin ↗
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Circular "Say Hello" badge */}
          <div className="hidden sm:flex flex-col items-center">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg
                viewBox="0 0 120 120"
                className="w-full h-full animate-spin-slow"
              >
                <path
                  id="circlePath"
                  d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
                  fill="none"
                />
                <text className="font-mono text-[9.5px] uppercase tracking-[0.24em] fill-[#0d0d0d]">
                  <textPath href="#circlePath">
                    · SAY HELLO · SAY HELLO · SAY HELLO
                  </textPath>
                </text>
              </svg>

              <div className="absolute w-10 h-10 rounded-full bg-[#0d0d0d] text-white flex items-center justify-center text-sm font-sans">
                →
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-8 border-t border-[rgba(13,13,13,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#77756f]">
          <div>
            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Built with Next.js & Lenis</span>
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget('#hero');
              }}
              className="text-[#0d0d0d] hover:underline underline-offset-4 font-semibold"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
