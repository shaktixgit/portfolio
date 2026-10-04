'use client';

import React from 'react';
import { CERTIFICATIONS } from '@/lib/data';

export function Certifications() {
  return (
    <section
      id="certifications"
      className="bg-white border-y border-[rgba(13,13,13,0.1)] py-24 sm:py-32 relative"
    >
      <style>{`
        .ink-flood-row {
          position: relative;
          overflow: hidden;
          transition: color 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .ink-flood-row::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #0d0d0d;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 0;
        }

        .ink-flood-row:hover::before,
        .ink-flood-row:focus-visible::before {
          transform: scaleX(1);
        }

        .ink-flood-row:hover *,
        .ink-flood-row:focus-visible * {
          color: #ffffff !important;
        }

        .ink-flood-arrow {
          transform: translateX(-12px);
          opacity: 0;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .ink-flood-row:hover .ink-flood-arrow,
        .ink-flood-row:focus-visible .ink-flood-arrow {
          transform: translateX(0);
          opacity: 1;
        }
      `}</style>

      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 lg:gap-16 items-start">
          {/* Left: Sticky Heading & Count */}
          <div className="lg:sticky lg:top-28 space-y-4 rv">
            <span className="font-mono-tag">04 — Certifications</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.045em] text-[#0d0d0d]">
              Always <span className="font-serif-italic text-[#77756f] font-normal">learning.</span>
            </h2>
            <p className="text-sm text-[#77756f] leading-relaxed max-w-sm">
              Accredited professional certifications across Data Science, AI, Business Intelligence, and Software Engineering.
            </p>
            <div className="pt-4 border-t border-[rgba(13,13,13,0.08)] flex items-center gap-3 font-mono text-xs text-[#0d0d0d]">
              <span className="w-2 h-2 rounded-full bg-[#0d0d0d]" />
              <span>{CERTIFICATIONS.length} Verified Credentials</span>
            </div>
          </div>

          {/* Right: Numbered Ink-Flood Rows */}
          <div className="divide-y divide-[rgba(13,13,13,0.08)] border-y border-[rgba(13,13,13,0.08)]">
            {CERTIFICATIONS.map((cert) => {
              const Tag = cert.link ? 'a' : 'div';
              return (
                <Tag
                  key={cert.index}
                  href={cert.link}
                  target={cert.link ? '_blank' : undefined}
                  rel={cert.link ? 'noopener noreferrer' : undefined}
                  tabIndex={0}
                  className="ink-flood-row px-4 sm:px-6 py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group outline-none"
                >
                  <div className="relative z-10 flex items-start sm:items-center gap-4 sm:gap-8">
                    <span className="font-mono text-xs text-[#a9a6a0] font-medium pt-1 sm:pt-0">
                      {cert.index}
                    </span>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-[#0d0d0d] tracking-tight">
                        {cert.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1 font-mono text-xs text-[#77756f]">
                        <span>{cert.issuer}</span>
                        {cert.credentialId && (
                          <>
                            <span>·</span>
                            <span className="text-[#a9a6a0]">ID: {cert.credentialId}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center justify-between sm:justify-end gap-4 font-mono text-xs text-[#77756f]">
                    <span>{cert.date}</span>
                    <span className="ink-flood-arrow text-base">↗</span>
                  </div>
                </Tag>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
