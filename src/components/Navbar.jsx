import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon, CodeIcon } from './Icons';

export default function Navbar({ theme, toggleTheme }) {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'skills', 'activity', 'experience', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <a href="#home" className="brand-logo">
          <div className="brand-icon">AJ</div>
          <span>Armaan Jaswal</span>
        </a>

        <nav>
          <ul className="nav-links">
            <li>
              <a href="#home" className={activeSection === 'home' ? 'active' : ''}>About</a>
            </li>
            <li>
              <a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>Projects</a>
            </li>
            <li>
              <a href="#skills" className={activeSection === 'skills' ? 'active' : ''}>Skills</a>
            </li>
            <li>
              <a href="#activity" className={activeSection === 'activity' ? 'active' : ''}>Activity</a>
            </li>
            <li>
              <a href="#experience" className={activeSection === 'experience' ? 'active' : ''}>Experience</a>
            </li>
            <li>
              <a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>Contact</a>
            </li>
          </ul>
        </nav>

        <div className="nav-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <a href="#contact" className="btn btn-primary" style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}>
            Let's Talk
          </a>
        </div>
      </div>
    </header>
  );
}
``