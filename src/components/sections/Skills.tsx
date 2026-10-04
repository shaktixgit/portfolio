'use client';

import React, { useState } from 'react';
import { SKILLS, SKILL_GROUPS, SkillElement } from '@/lib/data';
import { TechLogo, isBrand } from '@/components/ui/TechLogo';

export function Skills() {
  const [activeGroup, setActiveGroup] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<SkillElement>(SKILLS[0]);

  return (
    <section id="skills" className="section-padding bg-[#f4f2ee] relative">
      <style>{`
        @keyframes pop-in {
          0% {
            transform: scale(0.85);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .logo-pop {
          animation: pop-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .tile-enter {
          transition: transform 0.2s var(--ease), opacity 0.25s var(--ease), background-color 0.2s var(--ease);
        }
      `}</style>

      <div className="site-container">
        {/* Section Heading Tag */}
        <div className="rv mb-6">
          <span className="font-mono-tag">02 — Technical Skills</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.045em] text-[#0d0d0d] mt-2">
            The periodic table of my <span className="font-serif-italic text-[#77756f] font-normal">stack.</span>
          </h2>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2 mb-10 rv">
          {SKILL_GROUPS.map((group) => {
            const isActive = activeGroup === group;
            return (
              <button
                key={group}
                type="button"
                onClick={() => setActiveGroup(group)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                  isActive
                    ? 'bg-[#0d0d0d] text-white shadow-xs'
                    : 'bg-white border border-[rgba(13,13,13,0.1)] text-[#77756f] hover:text-[#0d0d0d] hover:border-[#0d0d0d]'
                }`}
              >
                {group}
              </button>
            );
          })}
        </div>

        {/* Layout: Periodic Grid + Sticky Inspector Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
          {/* 8-column desktop / 4-column mobile Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2.5">
            {SKILLS.map((skill, idx) => {
              const row = Math.floor(idx / 8);
              const col = idx % 8;
              const delay = (row + col) * 40;
              const matchesFilter =
                activeGroup === 'All' || skill.family === activeGroup;
              const isSelected = selectedSkill.name === skill.name;

              return (
                <div
                  key={skill.number}
                  role="button"
                  tabIndex={0}
                  onMouseEnter={() => setSelectedSkill(skill)}
                  onFocus={() => setSelectedSkill(skill)}
                  onClick={() => setSelectedSkill(skill)}
                  style={{
                    transitionDelay: `${delay}ms`,
                  }}
                  className={`tile-enter p-3 rounded-2xl flex flex-col justify-between aspect-square select-none cursor-pointer outline-none border transition-all ${
                    matchesFilter ? 'opacity-100' : 'opacity-20 pointer-events-none'
                  } ${
                    isSelected
                      ? 'bg-white border-[#0d0d0d] shadow-[0_8px_20px_-6px_rgba(13,13,13,0.15)] -translate-y-1'
                      : 'bg-white/70 hover:bg-white border-[rgba(13,13,13,0.08)] hover:border-[rgba(13,13,13,0.25)] hover:-translate-y-0.5'
                  }`}
                  aria-label={`${skill.name}, ${skill.family}`}
                >
                  <div className="flex items-center justify-between font-mono text-[9px] text-[#a9a6a0]">
                    <span>{skill.number}</span>
                    <span className="truncate max-w-[40px] text-right">{skill.family.slice(0, 3)}</span>
                  </div>

                  <div className="text-center my-auto">
                    <span className="font-serif-italic text-2xl font-bold text-[#0d0d0d] block leading-none">
                      {skill.symbol}
                    </span>
                  </div>

                  <div className="truncate text-center font-mono text-[10px] text-[#3a3a3a] font-medium leading-tight">
                    {skill.name}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky Inspector Panel */}
          <div className="lg:sticky lg:top-24 card-surface p-7 flex flex-col items-center text-center">
            <span className="font-mono text-[10px] text-[#a9a6a0] tracking-wider uppercase block mb-4">
              Element Inspector
            </span>

            {/* 150px Logo Area with Pop animation */}
            <div
              key={selectedSkill.name}
              className="logo-pop w-[150px] h-[150px] rounded-2xl bg-[#f4f2ee] p-6 flex items-center justify-center mb-6 shadow-inner relative group"
            >
              {/* Soft brand glow */}
              <div className="absolute inset-0 rounded-2xl bg-black/5 blur-lg opacity-40 -z-10" />

              <TechLogo
                brandKey={selectedSkill.brandKey}
                conceptKey={selectedSkill.conceptKey}
                name={selectedSkill.name}
                size={96}
                className="w-full h-full"
              />
            </div>

            {/* Element Data */}
            <div className="w-full text-left border-t border-[rgba(13,13,13,0.08)] pt-4">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="text-xl font-bold text-[#0d0d0d] tracking-tight">
                  {selectedSkill.name}
                </h3>
                <span className="font-mono text-xs text-[#77756f]">
                  #{selectedSkill.number} ({selectedSkill.symbol})
                </span>
              </div>

              <div className="inline-block px-2.5 py-0.5 rounded-full font-mono text-[10px] bg-[#e9e6e0] text-[#3a3a3a] mb-3">
                {selectedSkill.family}
              </div>

              <p className="text-xs text-[#77756f] leading-relaxed mb-4">
                {selectedSkill.description}
              </p>

              <div>
                <span className="font-mono text-[10px] text-[#a9a6a0] uppercase tracking-wider block mb-2">
                  Applied In Projects
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSkill.projects.map((proj, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded-md bg-[#f4f2ee] text-[11px] font-medium text-[#0d0d0d] border border-[rgba(13,13,13,0.06)]"
                    >
                      {proj}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
