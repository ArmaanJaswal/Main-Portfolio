import React from 'react';
import { portfolioData } from '../../data/portfolioData';

export default function SidebarIndex({ activeSection }) {
  const indexLinks = portfolioData.navigation?.indexLinks || [];


  return (
    <aside className="hidden lg:block w-40 shrink-0">
      <div className="sticky top-20 pl-6 border-l border-[#1a1a1a]">
        <div className="text-[11px] font-mono-code font-bold uppercase tracking-widest text-[#555555] mb-4">
          INDEX
        </div>

        <nav className="flex flex-col space-y-2.5 text-xs font-mono-code">
          {indexLinks.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? "text-white font-semibold translate-x-1"
                    : "text-[#666666] hover:text-[#aaaaaa]"
                }`}
              >
                {isActive && <span className="text-white select-none">—</span>}
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

