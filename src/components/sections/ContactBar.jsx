import React, { useState } from 'react';
import { Github, Linkedin, Mail, FileText, ArrowUpRight, Check, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../../data/portfolioData';

export default function ContactBar({ onShowToast }) {
  const { profile, contacts } = portfolioData;
  const [copied, setCopied] = useState(false);

  // Directly bind to profile URLs so updating profile in portfolioData always immediately works
  const resolvedContacts = [
    {
      name: "GitHub",
      url: profile.githubUsername ? `https://github.com/${profile.githubUsername}` : (contacts?.[0]?.url || "https://github.com/ArmaanJaswal"),
      type: "github"
    },
    {
      name: "LinkedIn",
      url: profile.linkedinUrl || contacts?.find(c => c.type === 'linkedin')?.url || "https://www.linkedin.com/in/armaan-jaswal-830012249/",
      type: "linkedin"
    },
    {
      name: "X (Twitter)",
      url: profile.twitterUrl || contacts?.find(c => c.type === 'x')?.url || "https://x.com/ArmaanJaswal2",
      type: "x"
    },
    {
      name: "Mail",
      url: `mailto:${profile.email || "armaanjaswal78@gmail.com"}`,
      type: "mail"
    },
    {
      name: "Resume",
      url: profile.resumeUrl || contacts?.find(c => c.type === 'resume')?.url || "https://drive.google.com/file/d/1toVCLhwrZwPv6daTN7mjvGpdKOYIERUU/view?usp=drive_link",
      type: "resume"
    }
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'github':
        return <Github className="w-4 h-4" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'x':
      case 'twitter':
        return (
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case 'mail':
        return <Mail className="w-4 h-4" />;
      case 'resume':
        return <FileText className="w-4 h-4" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  const handleClick = (e, contact) => {
    if (contact.type === 'mail') {
      e.preventDefault();
      const emailToCopy = profile.email || "armaanjaswal78@gmail.com";
      navigator.clipboard.writeText(emailToCopy);
      setCopied(true);
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.5 } });
      if (onShowToast) onShowToast("Email copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="contact" className="pt-12">
      <div className="border-b border-[#1a1a1a] pb-3 mb-6 flex items-center justify-between">
        <h2 className="font-serif-title text-2xl sm:text-3xl font-normal text-white">
          Contact
        </h2>
        <span className="text-[11px] font-mono-code text-[#666666]">
          Direct Channels
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {resolvedContacts.map((c) => (
          <a
            key={c.name}
            href={c.url}
            onClick={(e) => handleClick(e, c)}
            target={c.type !== 'mail' ? "_blank" : undefined}
            rel={c.type !== 'mail' ? "noopener noreferrer" : undefined}
            className="flex items-center justify-between rounded-xl border border-[#1e1e1e] bg-[#0d0d0d] px-3.5 py-3 text-xs sm:text-sm font-medium text-[#cccccc] hover:text-white hover:border-[#383838] hover:bg-[#141414] transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="text-[#888888] group-hover:text-white transition-colors">
                {c.type === 'mail' && copied ? <Check className="w-4 h-4 text-emerald-400" /> : getIcon(c.type)}
              </span>
              <span className="truncate">{c.type === 'mail' && copied ? 'Copied!' : c.name}</span>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#555555] group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 ml-1" />
          </a>
        ))}
      </div>
    </section>
  );
}

