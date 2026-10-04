'use client';

import React, { useState } from 'react';
import { PROJECTS, ProjectItem } from '@/lib/data';
import { TechLogo } from '@/components/ui/TechLogo';

export function Work() {
  const [activeId, setActiveId] = useState<string>(PROJECTS[0].id);

  return (
    <section id="work" className="section-padding bg-[#f4f2ee] relative">
      <style>{`
        .writing-mode-vertical {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }

        .clip-wipe {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          animation: clip-wipe 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes clip-wipe {
          0% {
            clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
          }
          100% {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          }
        }
      `}</style>

      <div className="site-container">
        {/* Section Heading Tag */}
        <div className="rv mb-8">
          <span className="font-mono-tag">03 — Selected Work</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.045em] text-[#0d0d0d] mt-2">
            Things I've <span className="font-serif-italic text-[#77756f] font-normal">built.</span>
          </h2>
        </div>

        {/* Desktop Horizontal Expanding Gallery / Mobile Vertical Accordion */}
        <div className="hidden lg:flex gap-4 w-full h-[min(78svh,620px)] items-stretch">
          {PROJECTS.map((project) => {
            const isOpen = activeId === project.id;
            return (
              <div
                key={project.id}
                role="region"
                aria-expanded={isOpen}
                tabIndex={0}
                onMouseEnter={() => setActiveId(project.id)}
                onFocus={() => setActiveId(project.id)}
                onClick={() => setActiveId(project.id)}
                className={`relative rounded-[26px] bg-white border border-[rgba(13,13,13,0.1)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden cursor-pointer shadow-[0_4px_24px_-4px_rgba(13,13,13,0.06)] ${
                  isOpen
                    ? 'flex-[8] shadow-[0_24px_48px_-12px_rgba(13,13,13,0.12)] cursor-default'
                    : 'flex-[1] hover:bg-neutral-50'
                }`}
              >
                {!isOpen ? (
                  /* Folded Slim Spine */
                  <div className="w-full h-full p-6 flex flex-col justify-between items-center select-none">
                    <span className="font-mono text-sm font-semibold text-[#a9a6a0]">
                      {project.index}
                    </span>

                    <div className="writing-mode-vertical text-sm font-bold tracking-tight text-[#0d0d0d] whitespace-nowrap my-auto">
                      {project.title}
                    </div>

                    <div className="w-8 h-8 rounded-full border border-[rgba(13,13,13,0.2)] flex items-center justify-center text-sm font-mono text-[#0d0d0d] group-hover:rotate-90 transition-transform">
                      +
                    </div>
                  </div>
                ) : (
                  /* Open Detailed Panel */
                  <div className="w-full h-full p-8 lg:p-10 grid grid-cols-1 xl:grid-cols-2 gap-8 items-center overflow-y-auto">
                    {/* Left: Info */}
                    <div className="flex flex-col justify-between h-full space-y-6">
                      <div>
                        <div className="flex items-center gap-3 font-mono text-xs text-[#77756f] mb-3">
                          <span className="text-[#0d0d0d] font-bold">{project.index}</span>
                          <span>—</span>
                          <span className="uppercase tracking-wider">{project.kicker}</span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0d0d0d] mb-4">
                          {project.title}
                        </h3>

                        <p className="text-sm text-[#3a3a3a] leading-relaxed mb-6">
                          {project.description}
                        </p>

                        {/* 2-column Feature List */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                          {project.features.map((feature, fIdx) => (
                            <div
                              key={fIdx}
                              className="p-3.5 rounded-xl bg-[#f4f2ee] border border-[rgba(13,13,13,0.06)] text-xs text-[#3a3a3a] leading-snug flex items-start gap-2"
                            >
                              <span className="font-mono text-[10px] text-[#0d0d0d] font-bold mt-0.5">
                                0{fIdx + 1}
                              </span>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tech Chips + GitHub Button */}
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-6">
                          {project.tech.map((t, tIdx) => (
                            <span
                              key={tIdx}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-white border border-[rgba(13,13,13,0.12)] text-[#0d0d0d]"
                            >
                              <TechLogo
                                brandKey={t.toLowerCase().replace(/\s+/g, '')}
                                conceptKey={t.toLowerCase()}
                                size={12}
                              />
                              {t}
                            </span>
                          ))}
                        </div>

                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary text-xs !h-10 px-5 inline-flex"
                          >
                            View on GitHub ↗
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Right: Illustrative Mini UI in grayscale */}
                    <div className="h-full w-full flex flex-col justify-center">
                      <IllustrativeUI type={project.uiType} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Vertical Accordion */}
        <div className="flex flex-col gap-4 lg:hidden">
          {PROJECTS.map((project) => {
            const isOpen = activeId === project.id;
            return (
              <div
                key={project.id}
                className="card-surface p-6 overflow-hidden border border-[rgba(13,13,13,0.1)]"
              >
                <button
                  type="button"
                  onClick={() => setActiveId(isOpen ? '' : project.id)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#a9a6a0]">
                      {project.index}
                    </span>
                    <h3 className="text-lg font-bold text-[#0d0d0d]">
                      {project.title}
                    </h3>
                  </div>
                  <span className="font-mono text-base font-bold text-[#0d0d0d]">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="mt-5 pt-5 border-t border-[rgba(13,13,13,0.08)] flex flex-col gap-4">
                    <span className="font-mono text-xs text-[#77756f] uppercase">
                      {project.kicker}
                    </span>
                    <p className="text-sm text-[#3a3a3a] leading-relaxed">
                      {project.description}
                    </p>

                    <div className="space-y-2">
                      {project.features.map((f, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-[#f4f2ee] text-xs text-[#3a3a3a]"
                        >
                          {f}
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5 my-2">
                      {project.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-white border border-[rgba(13,13,13,0.1)] text-[#0d0d0d]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-2">
                      <IllustrativeUI type={project.uiType} />
                    </div>

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-xs !h-9 px-4 mt-2 inline-flex"
                      >
                        View on GitHub ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function IllustrativeUI({
  type,
}: {
  type: ProjectItem['uiType'];
}) {
  return (
    <div className="relative w-full rounded-2xl bg-[#f4f2ee] p-5 border border-[rgba(13,13,13,0.08)] overflow-hidden flex flex-col justify-between shadow-inner clip-wipe">
      {/* Top Banner */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[rgba(13,13,13,0.08)]">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
        </div>
        <span className="font-mono text-[9px] text-[#77756f] uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-[rgba(13,13,13,0.08)]">
          Illustrative UI
        </span>
      </div>

      {type === 'ai-optimizer' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-white p-2.5 rounded-xl border border-[rgba(13,13,13,0.06)]">
              <span className="font-mono text-[9px] text-[#77756f] block">Throughput</span>
              <span className="font-mono text-sm font-bold text-[#0d0d0d]">1.4M req/s</span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-[rgba(13,13,13,0.06)]">
              <span className="font-mono text-[9px] text-[#77756f] block">Latency</span>
              <span className="font-mono text-sm font-bold text-[#0d0d0d]">32.4 ms</span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-[rgba(13,13,13,0.06)]">
              <span className="font-mono text-[9px] text-[#77756f] block">Cost Delta</span>
              <span className="font-mono text-sm font-bold text-[#0d0d0d]">-34.8%</span>
            </div>
          </div>
          {/* Simulated chart lines */}
          <div className="h-28 bg-white rounded-xl p-3 border border-[rgba(13,13,13,0.06)] flex items-end justify-between gap-1.5">
            {[45, 60, 52, 78, 40, 85, 92, 64, 50, 70, 80, 55].map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-[#0d0d0d] rounded-t-sm opacity-80"
                  style={{ height: `${val}%` }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {type === 'satyam-verify' && (
        <div className="space-y-3 font-mono">
          <div className="bg-white p-3 rounded-xl border border-[rgba(13,13,13,0.06)] flex items-center justify-between text-xs">
            <span>HASH: 8f2b...c914</span>
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-bold">
              VERIFIED ✓
            </span>
          </div>
          <div className="space-y-1.5 text-[10px] text-[#77756f] bg-white p-3 rounded-xl border border-[rgba(13,13,13,0.06)]">
            <div className="flex justify-between">
              <span>Timestamp:</span>
              <span className="text-[#0d0d0d]">2026-10-04 18:21 UTC</span>
            </div>
            <div className="flex justify-between">
              <span>Merkle Root:</span>
              <span className="text-[#0d0d0d]">4a17ef0019</span>
            </div>
            <div className="flex justify-between">
              <span>Signer:</span>
              <span className="text-[#0d0d0d]">ITER / Academic Ledger</span>
            </div>
          </div>
        </div>
      )}

      {type === 'research-5g' && (
        <div className="space-y-3">
          <div className="bg-white p-3 rounded-xl border border-[rgba(13,13,13,0.06)] text-center font-mono text-xs">
            <div className="text-[10px] text-[#77756f] mb-1">Path Loss Model (LaTeX)</div>
            <div className="font-serif italic font-bold text-sm text-[#0d0d0d]">
              PL(d) = 20 log10(4πd / λ) + χσ
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center font-mono text-[10px]">
            <div className="bg-white p-2.5 rounded-xl border border-[rgba(13,13,13,0.06)]">
              <span className="text-[#77756f] block">Band</span>
              <span className="text-[#0d0d0d] font-bold">28 GHz mmWave</span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-[rgba(13,13,13,0.06)]">
              <span className="text-[#77756f] block">Coverage</span>
              <span className="text-[#0d0d0d] font-bold">99.4% Density</span>
            </div>
          </div>
        </div>
      )}

      {type === 'sales-bi' && (
        <div className="space-y-3 font-mono">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white p-3 rounded-xl border border-[rgba(13,13,13,0.06)]">
              <div className="text-[9px] text-[#77756f]">DAX Measure</div>
              <div className="text-xs font-bold text-[#0d0d0d] truncate">TOTAL_SALES_YTD</div>
              <div className="text-sm font-bold text-[#0d0d0d] mt-1">$4.82M</div>
            </div>
            <div className="bg-white p-3 rounded-xl border border-[rgba(13,13,13,0.06)]">
              <div className="text-[9px] text-[#77756f]">YoY Growth</div>
              <div className="text-xs font-bold text-[#0d0d0d] truncate">CALCULATE()</div>
              <div className="text-sm font-bold text-[#0d0d0d] mt-1">+28.4%</div>
            </div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-[rgba(13,13,13,0.06)] space-y-2">
            <div className="flex justify-between text-[10px]">
              <span className="text-[#77756f]">Power Query Pipeline</span>
              <span className="text-[#0d0d0d] font-bold">12 Steps Applied</span>
            </div>
            <div className="w-full bg-[#f4f2ee] h-2 rounded-full overflow-hidden">
              <div className="bg-[#0d0d0d] h-full w-[85%]" />
            </div>
          </div>
        </div>
      )}

      <div className="text-right font-mono text-[8px] text-[#a9a6a0] mt-3">
        PROTOTYPE SIMULATION
      </div>
    </div>
  );
}
