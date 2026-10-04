'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PROFILE, NAV } from '@/lib/data';
import { useScroll } from '@/lib/scroll';

export function Navigation() {
  const { scrollToTarget } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('about');
  const [menuOpen, setMenuOpen] = useState(false);
  const pillRef = useRef<HTMLDivElement | null>(null);

  // Filter navigation items as per spec: About · Skills · Work · Experience · Achievements · Contact
  const navLinks = NAV.filter((n) => n.id !== 'certifications');

  // Track scroll position for progress bar and nav state
  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 40);

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((currentScroll / totalScroll) * 100);
      }
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

  // Track active section with IntersectionObserver rootMargin: -45% 0px -50% 0px
  useEffect(() => {
    const sectionIds = navLinks.map((item) => item.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-45% 0px -50% 0px',
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [navLinks]);

  // Handle mobile menu lock and escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollToTarget(href, -20);
  };

  return (
    <>
      {/* 2px ink scroll-progress bar along the very top */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-[#0d0d0d] z-50 transition-all duration-75 pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Scroll progress"
      />

      <header
        className="fixed top-0 left-0 w-full z-40 px-4 sm:px-8 py-4 pointer-events-none transition-all duration-300"
      >
        <div className="max-w-[1320px] mx-auto flex items-center justify-between pointer-events-auto">
          {/* Left: Initials mark + full name */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-3 group"
            aria-label="Back to top"
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-semibold tracking-wider transition-all duration-500 transform group-hover:rotate-[360deg] ${
                scrolled
                  ? 'bg-[#0d0d0d] text-white border border-[#0d0d0d] shadow-sm'
                  : 'bg-transparent text-[#0d0d0d] border border-[#0d0d0d]'
              }`}
            >
              {PROFILE.initials}
            </div>

            <span
              className={`text-sm font-semibold tracking-tight text-[#0d0d0d] transition-opacity duration-300 ${
                scrolled ? 'opacity-0 pointer-events-none -translate-x-2' : 'opacity-100 translate-x-0'
              }`}
            >
              {PROFILE.name}
            </span>
          </a>

          {/* Desktop Nav Pill */}
          <nav
            ref={pillRef}
            aria-label="Main Navigation"
            className={`hidden md:flex items-center gap-1 p-1.5 rounded-full transition-all duration-400 ${
              scrolled
                ? 'bg-white/80 backdrop-blur-md border border-[rgba(13,13,13,0.08)] shadow-[0_8px_30px_rgba(0,0,0,0.06)]'
                : 'bg-transparent border border-transparent'
            }`}
          >
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-colors duration-200 ${
                    isActive ? 'text-white' : 'text-[#77756f] hover:text-[#0d0d0d]'
                  }`}
                >
                  {/* Sliding active pill indicator */}
                  {isActive && (
                    <span
                      className="absolute inset-0 bg-[#0d0d0d] rounded-full -z-10 animate-fade-in"
                      style={{
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden px-4 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide border transition-all duration-300 ${
              scrolled
                ? 'bg-white/80 backdrop-blur-md border-[rgba(13,13,13,0.12)] text-[#0d0d0d]'
                : 'bg-white border-[rgba(13,13,13,0.12)] text-[#0d0d0d]'
            }`}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Overlay */}
      <div
        className={`fixed inset-0 bg-[#f4f2ee] z-50 flex flex-col justify-between p-8 md:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          clipPath: menuOpen
            ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
            : 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        }}
      >
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-full bg-[#0d0d0d] text-white flex items-center justify-center font-mono text-xs font-semibold">
            {PROFILE.initials}
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="px-4 py-1.5 rounded-full text-xs font-mono border border-[rgba(13,13,13,0.12)] bg-white text-[#0d0d0d]"
            aria-label="Close menu"
          >
            Close ✕
          </button>
        </div>

        <nav className="flex flex-col gap-5 my-auto" aria-label="Mobile Navigation">
          {navLinks.map((item, idx) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="flex items-baseline gap-4 text-3xl font-semibold tracking-tight text-[#0d0d0d] hover:text-[#77756f] transition-colors"
            >
              <span className="font-mono text-xs text-[#a9a6a0]">0{idx + 1}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="pt-6 border-t border-[rgba(13,13,13,0.08)] flex justify-between items-center text-xs text-[#77756f] font-mono">
          <span>{PROFILE.location}</span>
          <a
            href={PROFILE.resumePath}
            download
            className="underline underline-offset-4 text-[#0d0d0d]"
          >
            Résumé ↓
          </a>
        </div>
      </div>
    </>
  );
}
