import React from 'react';
import { Search, Sun, Moon } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export default function Navbar({ activeSection, onOpenCommand }) {
  const { profile, navigation } = portfolioData;
  const navLinks = navigation?.navLinks || [];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1c1c1c] bg-[#080808]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3.5 sm:px-6">
        {/* Brand Name */}
        <a href="#home" className="font-serif-title text-xl font-medium tracking-tight text-white hover:opacity-80 transition-opacity">
          {profile.brandName}
        </a>

        {/* Center Nav */}
        <nav className="flex items-center gap-6 text-xs sm:text-sm font-medium">
          {navLinks.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`transition-colors relative pb-0.5 ${
                  isActive ? "text-white font-semibold" : "text-[#888888] hover:text-white"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white rounded-full"></span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Actions: ⌘K Command Search */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCommand}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#888888] hover:text-white hover:bg-white/5 transition-all cursor-pointer"
            title="Search (⌘K)"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
