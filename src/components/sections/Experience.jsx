import React from 'react';
import { portfolioData } from '../../data/portfolioData';

export default function Experience() {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="pt-12">
      {/* Section Header */}
      <div className="border-b border-[#1a1a1a] pb-3 mb-6 flex items-center justify-between">
        <h2 className="font-serif-title text-2xl sm:text-3xl font-normal text-white">
          Experience
        </h2>
        <span className="text-[11px] font-mono-code text-[#666666]">
          Engineering Timeline
        </span>
      </div>

      {/* Experience Roles Timeline strictly from portfolioData */}
      <div className="space-y-6">
        {experience && experience.map((exp, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-[#1a1a1a] bg-[#0c0c0c] p-6 space-y-4 hover:border-[#2a2a2a] transition-colors"
          >
            {/* Role Header */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-[#161616] pb-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {exp.title}
                </h3>
                <div className="text-xs font-mono-code text-[#888888] mt-0.5">
                  {exp.company} • <span className="text-[#666666]">{exp.location}</span>
                </div>
              </div>

              <span className="text-xs font-mono-code text-cyan-400 font-medium">
                {exp.period}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#999999] leading-relaxed">
              {exp.description}
            </p>

            {/* Key Engineering Highlights */}
            {exp.highlights && exp.highlights.length > 0 && (
              <div className="space-y-2 pt-1">
                {exp.highlights.map((item, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2.5 text-xs text-[#cccccc]">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
                    <p className="leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Tech Tags */}
            {exp.tags && exp.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#161616]">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-[#1e1e1e] bg-[#111111] px-2.5 py-1 text-[10px] font-mono-code text-[#777777]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
