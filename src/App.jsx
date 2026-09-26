import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import SidebarIndex from './components/layout/SidebarIndex';
import VideoBannerProfile from './components/sections/VideoBannerProfile';
import About from './components/sections/About';
import ContactBar from './components/sections/ContactBar';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import TechStack from './components/sections/TechStack';
import GithubActivity from './components/sections/GithubActivity';
import LetsConnect from './components/sections/LetsConnect';
import CommandPalette from './components/ui/CommandPalette';
import { portfolioData } from './data/portfolioData';

export default function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.classList.add('dark');
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Scrollspy to highlight active INDEX item
  useEffect(() => {
    const sectionIds = [
      'home',
      'about',
      'contact',
      'projects',
      'experience',
      'tech-stack',
      'github',
      'lets-connect'
    ];

    const handleScroll = () => {
      const scrollY = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el && scrollY >= el.offsetTop) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#080808] text-[#e2e8f0] relative flex flex-col justify-between">
      {/* Top Fixed Navbar */}
      <Navbar
        activeSection={activeSection}
        onOpenCommand={() => setIsCommandOpen(true)}
      />

      {/* Main Layout with Hatched Side Margins framing the container */}
      <div className="relative w-full border-b border-[#141414]">
        <div className="mx-auto flex max-w-7xl">
          {/* Left Hatched Gutter */}
          <div className="hidden xl:block w-16 shrink-0 border-r border-[#141414] hatched-pattern relative">
            <div className="absolute top-0 right-[-5px] text-[#333333] text-xs select-none font-mono-code">+</div>
            <div className="absolute bottom-0 right-[-5px] text-[#333333] text-xs select-none font-mono-code">+</div>
          </div>

          {/* Main Column */}
          <div className="flex-1 min-w-0 px-4 sm:px-8 py-6 max-w-5xl mx-auto">
            <div className="flex gap-10">
              {/* Main Content Column */}
              <main className="flex-1 min-w-0 space-y-16">
                {/* 1. Video Space with Live Clock Overlay & Profile */}
                <VideoBannerProfile
                  onOpenCommand={() => setIsCommandOpen(true)}
                  onShowToast={showToast}
                />

                {/* 2. About with Mascot & Snapshot */}
                <About />

                {/* 3. Contact Quick Bar */}
                <ContactBar onShowToast={showToast} />

                {/* 4. Projects */}
                <Projects />

                {/* 5. Experience */}
                <Experience />

                {/* 6. Tech Stack */}
                <TechStack />

                {/* 7. GitHub Activity */}
                <GithubActivity />

                {/* 8. Let's Connect */}
                <LetsConnect onShowToast={showToast} />

                {/* Clean Footer */}
                <footer className="pt-16 pb-12 border-t border-[#1a1a1a] text-xs text-[#555555] flex flex-col sm:flex-row items-center justify-between gap-3">
                  <p>© {new Date().getFullYear()} {portfolioData.profile.name}</p>
                  <div className="flex items-center gap-4 text-[11px] font-mono-code text-[#444444]">
                    <span>LATENCY: {portfolioData.footer?.latency || "12ms"}</span>
                    <span>•</span>
                    <span>STATUS: {portfolioData.footer?.status || "OPERATIONAL"}</span>
                  </div>
                </footer>
              </main>

              {/* Sticky INDEX Navigation Sidebar */}
              <SidebarIndex activeSection={activeSection} />
            </div>
          </div>

          {/* Right Hatched Gutter */}
          <div className="hidden xl:block w-16 shrink-0 border-l border-[#141414] hatched-pattern relative">
            <div className="absolute top-0 left-[-5px] text-[#333333] text-xs select-none font-mono-code">+</div>
            <div className="absolute bottom-0 left-[-5px] text-[#333333] text-xs select-none font-mono-code">+</div>
          </div>
        </div>
      </div>

      {/* Toast Notification Pill */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-white/20 bg-black/90 px-4 py-2.5 text-xs font-mono-code text-white shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-3 duration-200">
          <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ⌘K Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandOpen}
        setIsOpen={setIsCommandOpen}
        onShowToast={showToast}
      />
    </div>
  );
}

