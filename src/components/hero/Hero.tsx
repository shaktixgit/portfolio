'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { PROFILE } from '@/lib/data';
import { useScroll } from '@/lib/scroll';

export function Hero() {
  const { scrollToTarget } = useScroll();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [audioBlocked, setAudioBlocked] = useState(true);

  const unlockSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.volume = 1.0;
    video.play().catch(() => {});
    setIsPlayingSound(true);
    setAudioBlocked(false);
  }, []);

  const toggleSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.muted) {
      video.muted = false;
      video.volume = 1.0;
      setIsPlayingSound(true);
      setAudioBlocked(false);
      video.play().catch(() => {});
    } else {
      video.muted = true;
      setIsPlayingSound(false);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Try unmuted autoplay first
    video.muted = false;
    video.volume = 1.0;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Autoplay with sound succeeded
          setIsPlayingSound(true);
          setAudioBlocked(false);
        })
        .catch(() => {
          // Autoplay with sound blocked by browser policy, fallback to muted
          video.muted = true;
          video.play().catch(() => {});
          setIsPlayingSound(false);
          setAudioBlocked(true);
        });
    }

    // Global unlock listener on first user interaction anywhere
    const handleFirstGesture = () => {
      unlockSound();
      removeListeners();
    };

    const removeListeners = () => {
      window.removeEventListener('pointerdown', handleFirstGesture, true);
      window.removeEventListener('click', handleFirstGesture, true);
      window.removeEventListener('keydown', handleFirstGesture, true);
      window.removeEventListener('touchstart', handleFirstGesture, true);
      window.removeEventListener('wheel', handleFirstGesture, true);
    };

    window.addEventListener('pointerdown', handleFirstGesture, { capture: true, once: true });
    window.addEventListener('click', handleFirstGesture, { capture: true, once: true });
    window.addEventListener('keydown', handleFirstGesture, { capture: true, once: true });
    window.addEventListener('touchstart', handleFirstGesture, { capture: true, once: true });
    window.addEventListener('wheel', handleFirstGesture, { capture: true, once: true });

    // IntersectionObserver to pause when less than 35% visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 0.35) {
          if (!video.paused) video.pause();
        } else {
          if (video.paused) video.play().catch(() => {});
        }
      },
      {
        threshold: [0, 0.35, 1],
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      removeListeners();
      observer.disconnect();
    };
  }, [unlockSound]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-between items-center pt-24 pb-12 overflow-hidden bg-[#f4f2ee]"
    >
      <style>{`
        .ghost-title {
          font-size: clamp(6.5rem, 21vw, 24rem);
          line-height: 0.82;
          font-weight: 800;
          letter-spacing: -0.05em;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(13, 13, 13, 0.08);
          user-select: none;
          pointer-events: none;
        }

        @keyframes sound-ping {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(13, 13, 13, 0.4);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 14px rgba(13, 13, 13, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(13, 13, 13, 0);
          }
        }

        .sound-ping-ring {
          animation: sound-ping 2s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
      `}</style>

      {/* Giant outlined ghost word behind person */}
      <div className="absolute inset-0 flex items-center justify-center -z-0">
        <h1 className="ghost-title uppercase font-sans">
          {PROFILE.firstName}
        </h1>
      </div>

      {/* Video Container - Centered */}
      <div
        className="relative z-10 flex flex-col items-center justify-center my-auto w-full max-w-[768px] cursor-pointer select-none"
        onClick={unlockSound}
        title={isPlayingSound ? 'Audio is playing' : 'Click to enable voice'}
      >
        <div className="relative flex items-center justify-center w-auto">
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="auto"
            className="w-auto h-[62svh] md:h-[min(94svh,1000px)] aspect-[768/960] object-contain"
          >
            <source src="/hero/hero.webm?v=5" type="video/webm" />
            <source src="/hero/hero.mp4?v=5" type="video/mp4" />
          </video>
        </div>

        {/* Floating pill to enable voice if browser blocked autoplay */}
        {audioBlocked && (
          <div className="absolute bottom-6 md:bottom-12 z-30 pointer-events-auto">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                unlockSound();
              }}
              className="px-5 py-2.5 rounded-full bg-[#0d0d0d] text-white text-xs font-mono tracking-wider flex items-center gap-2.5 shadow-2xl hover:scale-105 active:scale-95 transition-transform border border-white/20 sound-ping-ring"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
              <span>Click to enable voice</span>
            </button>
          </div>
        )}

        {/* Audio control round button */}
        <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-30 pointer-events-auto">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleSound();
            }}
            aria-label={isPlayingSound ? 'Mute audio' : 'Play audio with voice'}
            className={`w-[46px] h-[46px] rounded-full bg-[#0d0d0d] text-white flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 ${
              audioBlocked ? 'sound-ping-ring' : ''
            }`}
          >
            {isPlayingSound ? (
              // Pause icon (two vertical bars)
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              // Play icon (triangle)
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="translate-x-[1px]">
                <polygon points="6,4 20,12 6,20" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Content Bar: Role heading & CTAs */}
      <div className="relative z-20 w-full max-w-[1320px] mx-auto px-6 sm:px-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mt-4">
        <div>
          <div className="font-mono-tag mb-2">00 — Introduction</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.045em] text-[#0d0d0d] leading-none">
            {PROFILE.role.split(' ')[0]} {PROFILE.role.split(' ')[1]}{' '}
            <span className="font-serif-italic text-[#77756f] font-normal">
              {PROFILE.role.split(' ').slice(2).join(' ') || 'Analyst.'}
            </span>
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              scrollToTarget('#work');
            }}
            className="btn-primary"
          >
            Explore work
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToTarget('#contact');
            }}
            className="btn-secondary"
          >
            Let's talk
          </a>
          <a
            href={PROFILE.resumePath}
            download
            className="btn-secondary font-mono text-xs"
          >
            Résumé ↓
          </a>
        </div>
      </div>
    </section>
  );
}
