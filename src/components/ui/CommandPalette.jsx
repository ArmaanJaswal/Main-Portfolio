import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import {
  Search,
  FolderGit2,
  Cpu,
  Briefcase,
  Mail,
  Copy,
  ExternalLink,
  X,
  Code2,
  Sparkles,
  User,
  FileText,
  Send,
  Globe,
  Radio,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../../data/portfolioData';

export default function CommandPalette({ isOpen, setIsOpen, onShowToast }) {
  const { profile, projects, techStack, experience, contacts, navigation } = portfolioData;

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [setIsOpen]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    if (onShowToast) onShowToast("Email copied to clipboard!");
    setIsOpen(false);
  };

  const navigateTo = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openUrl = (url) => {
    setIsOpen(false);
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Flatten all tech stack items for direct search
  const allSkills = (techStack || []).flatMap((cat) =>
    (cat.items || []).map((item) => ({ ...item, categoryName: cat.category }))
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#0c0c0e] shadow-2xl shadow-black/90 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 text-[#777777] hover:text-white transition-colors cursor-pointer z-10"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <Command className="w-full">
          {/* Search Input Bar */}
          <div className="flex items-center gap-2.5 border-b border-[#1c1c1c] px-4 py-3 text-[#888888]">
            <Search className="w-4 h-4 text-cyan-400 shrink-0" />
            <Command.Input
              placeholder="Search projects, skills, experience, sections, or actions..."
              className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-[#555555] outline-none font-mono-code"
              autoFocus
            />
            <span className="hidden sm:inline text-[10px] font-mono-code bg-[#1a1a1a] border border-[#2c2c2c] px-1.5 py-0.5 rounded text-[#777777]">
              ESC
            </span>
          </div>

          <Command.List className="max-h-96 overflow-y-auto p-2 text-xs font-mono-code scrollbar-thin">
            <Command.Empty className="py-10 text-center text-xs text-[#666666]">
              No matching results found.
            </Command.Empty>

            {/* 1. Projects Showcase */}
            <Command.Group heading="Projects & Work" className="text-[10px] font-bold uppercase tracking-wider text-[#666666] px-2 py-1.5">
              {(projects || []).map((project) => (
                <Command.Item
                  key={project.id}
                  value={`project ${project.title} ${project.category} ${project.tags?.join(' ')}`}
                  onSelect={() => navigateTo('projects')}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-[#cccccc] cursor-pointer hover:bg-white/10 hover:text-white transition-colors group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <FolderGit2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="font-semibold text-white truncate">{project.title}</span>
                    <span className="text-[10px] text-[#777777] truncate hidden sm:inline">• {project.category}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    {project.demo && project.demo !== '#' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openUrl(project.demo);
                        }}
                        className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 hover:bg-emerald-900 transition-colors"
                        title="Open Live Demo"
                      >
                        Live Demo
                      </button>
                    )}
                    {project.github && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openUrl(project.github);
                        }}
                        className="text-[10px] px-2 py-0.5 rounded bg-[#1a1a1a] border border-[#2a2a2a] text-[#aaaaaa] hover:text-white transition-colors"
                        title="Open GitHub Repo"
                      >
                        GitHub
                      </button>
                    )}
                  </div>
                </Command.Item>
              ))}
            </Command.Group>

            {/* 2. Navigation Sections */}
            <Command.Group heading="Navigate Sections" className="text-[10px] font-bold uppercase tracking-wider text-[#666666] px-2 py-1.5 mt-2">
              <Command.Item
                value="navigation home profile hero banner cosmic"
                onSelect={() => navigateTo('home')}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[#cccccc] cursor-pointer hover:bg-white/10 hover:text-white transition-colors"
              >
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span>Home / Profile</span>
              </Command.Item>
              {(navigation?.indexLinks || []).map((link) => (
                <Command.Item
                  key={link.id}
                  value={`navigation section ${link.label} ${link.id}`}
                  onSelect={() => navigateTo(link.id)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[#cccccc] cursor-pointer hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{link.label}</span>
                </Command.Item>
              ))}
            </Command.Group>

            {/* 3. Skills & Technologies */}
            <Command.Group heading="Skills & Tech Stack" className="text-[10px] font-bold uppercase tracking-wider text-[#666666] px-2 py-1.5 mt-2">
              {allSkills.map((skill) => (
                <Command.Item
                  key={skill.name}
                  value={`skill tech stack technology ${skill.name} ${skill.categoryName} ${skill.level}`}
                  onSelect={() => navigateTo('tech-stack')}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-[#cccccc] cursor-pointer hover:bg-white/10 hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Cpu className="w-3.5 h-3.5 text-purple-400" />
                    <span>{skill.name}</span>
                    <span className="text-[10px] text-[#666666] hidden sm:inline">({skill.categoryName})</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-1.5 py-0.5 rounded">
                    {skill.level}
                  </span>
                </Command.Item>
              ))}
            </Command.Group>

            {/* 4. Experience */}
            <Command.Group heading="Work Experience" className="text-[10px] font-bold uppercase tracking-wider text-[#666666] px-2 py-1.5 mt-2">
              {(experience || []).map((exp, idx) => (
                <Command.Item
                  key={idx}
                  value={`experience work role ${exp.title} ${exp.company} ${exp.period}`}
                  onSelect={() => navigateTo('experience')}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-[#cccccc] cursor-pointer hover:bg-white/10 hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-white font-medium">{exp.title}</span>
                    <span className="text-[#888888]">@{exp.company}</span>
                  </div>
                  <span className="text-[10px] text-[#666666]">{exp.period}</span>
                </Command.Item>
              ))}
            </Command.Group>

            {/* 5. Quick Actions & Direct Links */}
            <Command.Group heading="Quick Actions & Socials" className="text-[10px] font-bold uppercase tracking-wider text-[#666666] px-2 py-1.5 mt-2">
              <Command.Item
                value="copy email address mail contact armaanjaswal78@gmail.com"
                onSelect={handleCopyEmail}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-[#cccccc] cursor-pointer hover:bg-white/10 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Copy className="w-3.5 h-3.5 text-amber-400" />
                  <span>Copy Primary Email</span>
                </div>
                <span className="text-[10px] text-[#777777]">{profile.email}</span>
              </Command.Item>

              <Command.Item
                value="message send contact form let's connect email inquiry"
                onSelect={() => navigateTo('lets-connect')}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-[#cccccc] cursor-pointer hover:bg-white/10 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Send className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Send a Direct Message</span>
                </div>
                <span className="text-[10px] text-[#777777]">Contact Form</span>
              </Command.Item>

              {profile.resumeUrl && (
                <Command.Item
                  value="resume cv download view pdf"
                  onSelect={() => openUrl(profile.resumeUrl)}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-[#cccccc] cursor-pointer hover:bg-white/10 hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-3.5 h-3.5 text-blue-400" />
                    <span>View Resume / CV</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#666666]" />
                </Command.Item>
              )}

              {profile.githubUsername && (
                <Command.Item
                  value="github profile source repositories code"
                  onSelect={() => openUrl(`https://github.com/${profile.githubUsername}`)}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-[#cccccc] cursor-pointer hover:bg-white/10 hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                    <span>Open GitHub Profile (@{profile.githubUsername})</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#666666]" />
                </Command.Item>
              )}

              {profile.linkedinUrl && (
                <Command.Item
                  value="linkedin profile social connect networking"
                  onSelect={() => openUrl(profile.linkedinUrl)}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-[#cccccc] cursor-pointer hover:bg-white/10 hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Open LinkedIn Profile</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#666666]" />
                </Command.Item>
              )}

              {profile.twitterUrl && (
                <Command.Item
                  value="twitter x profile social tweets"
                  onSelect={() => openUrl(profile.twitterUrl)}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-[#cccccc] cursor-pointer hover:bg-white/10 hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-3.5 h-3.5 text-sky-400" />
                    <span>Open X (Twitter) Profile</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#666666]" />
                </Command.Item>
              )}
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}

