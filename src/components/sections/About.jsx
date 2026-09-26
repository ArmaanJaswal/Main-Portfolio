import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import DoodleCat from '../ui/DoodleCat';

export default function About() {
  const { profile } = portfolioData;

  return (
    <section id="about" className="pt-12">
      {/* Section Title with Pixel Mascot */}
      <div className="flex items-center gap-3 border-b border-[#1a1a1a] pb-3 mb-6">
        <h2 className="font-serif-title text-2xl sm:text-3xl font-normal text-white">
          About
        </h2>
        <DoodleCat className="opacity-90" />
      </div>

      {/* About Description Bullets */}
      <div className="space-y-4 text-xs sm:text-sm text-[#a8a8a8] leading-relaxed">
        {profile.aboutParagraphs.map((para, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <span className="text-white text-base leading-tight select-none">•</span>
            <p>{para}</p>
          </div>
        ))}
      </div>

      {/* Developer Snapshot Box */}
      <div className="mt-8 rounded-xl border border-[#1c1c1c] bg-[#0c0c0c] p-5 sm:p-6">
        <div className="text-[11px] font-mono-code font-bold uppercase tracking-widest text-[#777777] mb-4">
          DEVELOPER SNAPSHOT
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#cccccc] font-medium">
          {profile.snapshot.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
