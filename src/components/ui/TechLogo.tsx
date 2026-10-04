'use client';

import React from 'react';

export const BRAND_MAP: Record<string, string> = {
  python: '/logos/python.svg',
  powerbi: '/logos/powerbi.svg',
  mysql: '/logos/mysql.svg',
  pandas: '/logos/pandas.svg',
  numpy: '/logos/numpy.svg',
  excel: '/logos/excel.svg',
  java: '/logos/java.svg',
  github: '/logos/github.svg',
  html5: '/logos/html5.svg',
  css3: '/logos/css3.svg',
  javascript: '/logos/javascript.svg',
  react: '/logos/react.svg',
  latex: '/logos/latex.svg',
  git: '/logos/git.svg',
  vscode: '/logos/vscode.svg',
  c: '/logos/c.svg',
  leetcode: '/logos/leetcode.svg',
  codechef: '/logos/codechef.svg',
  geeksforgeeks: '/logos/geeksforgeeks.svg',
  hackerrank: '/logos/hackerrank.svg',
  unstop: '/logos/unstop.svg',
  ibm: '/logos/ibm.svg',
  deloitte: '/logos/deloitte.svg',
  hp: '/logos/hp.svg',
  microsoft: '/logos/microsoft.svg',
  freecodecamp: '/logos/freecodecamp.svg',
};

export const CONCEPT_MAP: Record<string, React.ReactNode> = {
  visualization: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M3 3v18h18" />
      <path d="M18 9l-5 5-4-4-6 6" />
      <circle cx="18" cy="9" r="1.5" />
      <circle cx="13" cy="14" r="1.5" />
      <circle cx="9" cy="10" r="1.5" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  ),
  pipeline: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <rect x="2" y="6" width="6" height="12" rx="2" />
      <rect x="16" y="6" width="6" height="12" rx="2" />
      <path d="M8 12h8" />
      <polyline points="13 9 16 12 13 15" />
    </svg>
  ),
  formula: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M4 4h16" />
      <path d="M4 20h16" />
      <path d="M8 9l8 6" />
      <path d="M16 9l-8 6" />
    </svg>
  ),
  telecom: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M12 2a10 10 0 0 1 10 10" />
      <path d="M12 6a6 6 0 0 1 6 6" />
      <circle cx="12" cy="12" r="2" />
      <line x1="12" y1="14" x2="12" y2="22" />
      <line x1="9" y1="22" x2="15" y2="22" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <circle cx="9" cy="10" r="1.5" />
      <circle cx="15" cy="10" r="1.5" />
      <path d="M8 16h8" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
    </svg>
  ),
  ml: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="12" r="2.5" />
      <line x1="8.5" y1="7" x2="15.5" y2="11" />
      <line x1="8.5" y1="17" x2="15.5" y2="13" />
    </svg>
  ),
  analytics: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <path d="M11 8v6l3 2" />
    </svg>
  ),
  os: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <circle cx="6" cy="7" r="1" />
      <circle cx="10" cy="7" r="1" />
    </svg>
  ),
  hackathon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
};

export function isBrand(key?: string): boolean {
  if (!key) return false;
  return key.toLowerCase() in BRAND_MAP;
}

interface TechLogoProps {
  brandKey?: string;
  conceptKey?: string;
  name?: string;
  size?: number;
  className?: string;
}

export function TechLogo({
  brandKey,
  conceptKey,
  name,
  size = 24,
  className = '',
}: TechLogoProps) {
  const normBrand = brandKey ? brandKey.toLowerCase() : undefined;
  const brandPath = normBrand ? BRAND_MAP[normBrand] : undefined;

  if (brandPath) {
    return (
      <div
        className={`inline-flex items-center justify-center flex-shrink-0 ${className}`}
        style={{ width: size, height: size }}
      >
        <img
          src={brandPath}
          alt={name || brandKey || 'Brand logo'}
          width={size}
          height={size}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
    );
  }

  const normConcept = conceptKey ? conceptKey.toLowerCase() : undefined;
  const conceptIcon = normConcept ? CONCEPT_MAP[normConcept] : undefined;

  if (conceptIcon) {
    return (
      <div
        className={`inline-flex items-center justify-center flex-shrink-0 text-[#3a3a3a] ${className}`}
        style={{ width: size, height: size }}
      >
        {conceptIcon}
      </div>
    );
  }

  // Fallback icon
  return (
    <div
      className={`inline-flex items-center justify-center flex-shrink-0 font-mono text-xs font-semibold rounded bg-[#e9e6e0] text-[#0d0d0d] ${className}`}
      style={{ width: size, height: size }}
    >
      {(name || brandKey || 'TK').slice(0, 2).toUpperCase()}
    </div>
  );
}
