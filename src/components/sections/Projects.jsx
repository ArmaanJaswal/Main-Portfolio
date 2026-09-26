import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Github, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [expandedId, setExpandedId] = useState(null);
  const { projects } = portfolioData;

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  const filtered = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter);

  const toggleExpand = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section id="projects" className="pt-12">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1a1a1a] pb-3 mb-6 gap-4">
        <h2 className="font-serif-title text-2xl sm:text-3xl font-normal text-white">
          Projects
        </h2>

        {/* Filter Pills */}
        <div className="flex items-center rounded-lg border border-[#222222] bg-[#0d0d0d] p-0.5 text-xs font-medium">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                filter === cat
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-[#777777] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((project) => {
          const isExpanded = expandedId === project.id;

          return (
            <div
              key={project.id}
              className="group flex flex-col justify-between rounded-2xl border border-[#1a1a1a] bg-[#0c0c0c] p-4 transition-all duration-300 hover:border-[#2d2d2d]"
            >
              <div>
                {/* Media Preview Box */}
                <div className="relative h-44 sm:h-48 w-full overflow-hidden rounded-xl border border-[#1e1e1e] bg-[#080808]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Badges on Image */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[10px] font-mono-code font-bold tracking-wider ${
                      project.status === 'LIVE'
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/50'
                        : 'bg-amber-950/80 text-amber-400 border border-amber-800/50'
                    }`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
                      {project.status}
                    </span>
                  </div>

                  {project.isFeatured && (
                    <div className="absolute top-3 right-3">
                      <span className="rounded-md bg-amber-950/70 border border-amber-700/40 px-2 py-0.5 text-[10px] font-mono-code font-bold text-amber-300">
                        FEATURED
                      </span>
                    </div>
                  )}
                </div>

                {/* Title and Year */}
                <div className="flex items-center justify-between mt-4">
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-xs font-mono-code text-[#666666]">
                    {project.year}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-2 text-xs text-[#999999] leading-relaxed">
                  {project.description}
                </p>

                {/* Expandable Engineering Details */}
                {project.engineeringDetails && (
                  <div className="mt-2">
                    <button
                      onClick={() => toggleExpand(project.id)}
                      className="inline-flex items-center gap-1 text-[11px] font-mono-code text-[#666666] hover:text-[#aaaaaa] transition-colors cursor-pointer py-1"
                    >
                      <span>{isExpanded ? 'Hide engineering details' : 'Show engineering details'}</span>
                      {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>

                    {isExpanded && (
                      <div className="mt-1.5 rounded-lg border border-[#222222] bg-[#121212] p-2.5 text-[11px] text-[#888888] leading-relaxed font-mono-code animate-in fade-in duration-200">
                        {project.engineeringDetails}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Tags and Links */}
              <div className="flex items-end justify-between gap-3 pt-4 mt-2 border-t border-[#161616]">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-[#1e1e1e] bg-[#111111] px-2 py-0.5 text-[10px] font-mono-code text-[#777777]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#666666] hover:text-white transition-colors p-1"
                      title="View Live Application"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#666666] hover:text-white transition-colors p-1"
                      title="View Source Code"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
