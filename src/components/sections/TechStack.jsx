import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { TechLogo } from '../ui/TechLogos';
import { Sparkles } from 'lucide-react';

export default function TechStack() {
  const rawTechStack = portfolioData.techStack || [];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Normalize techStack whether structured as nested categories or flat skill list
  const allSkills = rawTechStack.flatMap((entry) => {
    if (entry && entry.items && Array.isArray(entry.items)) {
      return entry.items.map((item) => ({
        name: item.name || '',
        category: entry.category || 'General',
        level: item.level || 'Proficient',
        desc: item.desc || `${item.name} engineering & development`,
        color: item.color || '#38BDF8'
      }));
    }
    if (entry && entry.name) {
      return [{
        name: entry.name,
        category: entry.category || 'General',
        level: entry.level || 'Proficient',
        desc: entry.desc || `${entry.name} engineering & development`,
        color: entry.color || '#38BDF8'
      }];
    }
    return [];
  });

  // Extract categories dynamically
  const categories = ['All', ...Array.from(new Set(allSkills.map(s => s.category).filter(Boolean)))];

  const filteredSkills = selectedCategory === 'All'
    ? allSkills
    : allSkills.filter(s => s.category === selectedCategory);

  const getFloatClass = (idx) => {
    const classes = [
      'animate-float-1',
      'animate-float-2',
      'animate-float-3',
      'animate-float-4',
      'animate-float-5'
    ];
    return classes[idx % classes.length];
  };

  return (
    <section id="tech-stack" className="pt-12">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1a1a1a] pb-3 mb-6 gap-3">
        <div className="flex items-center gap-2">
          <h2 className="font-serif-title text-2xl sm:text-3xl font-normal text-white">
            Tech Stack
          </h2>
          <span className="text-[11px] font-mono-code text-[#666666] hidden sm:inline">
            • Interactive floating ecosystem
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center rounded-lg border border-[#222222] bg-[#0d0d0d] p-0.5 text-xs font-medium">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer text-[11px] font-mono-code ${
                selectedCategory === cat
                  ? 'bg-white text-black font-bold shadow-sm'
                  : 'text-[#777777] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Floating Tech Stack Cloud Area (NO BOXES) */}
      <div className="relative min-h-[280px] sm:min-h-[320px] rounded-2xl border border-[#1a1a1a]/80 bg-gradient-to-b from-[#0c0c0e] via-[#09090b] to-[#070708] p-6 sm:p-8 overflow-hidden shadow-2xl">
        {/* Subtle radial ambient glows in background */}
        <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-64 h-64 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />

        {/* Floating Badges Cloud strictly from portfolioData */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4.5 py-4">
          {filteredSkills.map((skill, idx) => {
            const isHovered = hoveredSkill?.name === skill.name;
            const floatClass = getFloatClass(idx);

            return (
              <div
                key={`${skill.name}-${idx}`}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
                className={`group relative transition-all duration-300 ${floatClass}`}
              >
                {/* Floating Tech Pill */}
                <div
                  style={{
                    boxShadow: isHovered
                      ? `0 10px 25px -5px ${skill.color || '#38BDF8'}40, 0 0 15px ${skill.color || '#38BDF8'}25`
                      : '0 4px 12px rgba(0,0,0,0.5)'
                  }}
                  className={`flex items-center gap-2.5 rounded-full px-4 py-2.5 transition-all duration-300 cursor-pointer backdrop-blur-md ${
                    isHovered
                      ? 'scale-110 -translate-y-1 bg-[#16161a] border-white/40'
                      : 'bg-[#101014]/90 border border-[#222226] hover:border-[#383842]'
                  }`}
                >
                  {/* Official Tech Brand Logo */}
                  <div className="flex items-center justify-center shrink-0 w-6 h-6 transition-transform duration-300 group-hover:scale-110">
                    <TechLogo name={skill.name} className="w-5 h-5" color={skill.color} />
                  </div>

                  {/* Name */}
                  <span className="text-xs sm:text-sm font-bold font-mono-code text-white group-hover:text-cyan-200 transition-colors">
                    {skill.name}
                  </span>

                  {/* Category dot */}
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: skill.color || '#38BDF8' }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Detail Box */}
        <div className="mt-8 pt-4 border-t border-[#181818] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono-code text-[#777777]">
          {hoveredSkill ? (
            <div className="flex items-center gap-2 text-white animate-in fade-in duration-200">
              <span className="flex items-center gap-1.5 font-bold text-cyan-400">
                <TechLogo name={hoveredSkill.name} className="w-4 h-4" />
                {hoveredSkill.name}
              </span>
              <span className="text-[#555555]">•</span>
              <span className="text-[#aaaaaa]">{hoveredSkill.desc}</span>
              <span className="text-[#555555]">•</span>
              <span className="text-emerald-400 font-semibold">{hoveredSkill.level}</span>
            </div>
          ) : (
            <span className="text-[#666666] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Hover over any floating technology badge to view architecture details
            </span>
          )}

          <div className="text-[11px] text-[#555555]">
            {filteredSkills.length} core technologies
          </div>
        </div>
      </div>
    </section>
  );
}
