'use client';

import React from 'react';
import { Navigation } from './Navigation';
import { RevealObserver } from './ui/RevealObserver';
import { Hero } from './hero/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Work } from './sections/Work';
import { Certifications } from './sections/Certifications';
import { Experience } from './sections/Experience';
import { Achievements } from './sections/Achievements';
import { Gallery } from './sections/Gallery';
import { Contact } from './sections/Contact';

export function App() {
  return (
    <div className="relative min-h-screen bg-[#f4f2ee] text-[#0d0d0d] overflow-x-hidden selection:bg-[#0d0d0d] selection:text-[#f4f2ee]">
      <RevealObserver />
      <Navigation />

      <main>
        <Hero />
        <About />
        <Skills />
        <Work />
        <Certifications />
        <Experience />
        <Achievements />
        <Gallery />
      </main>

      <Contact />
    </div>
  );
}
