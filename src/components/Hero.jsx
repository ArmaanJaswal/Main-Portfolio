import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { GithubIcon, TwitterIcon, LinkedinIcon, DiscordIcon, MailIcon, SparklesIcon } from './Icons';

export default function Hero() {
  const { profile, stats, socials } = portfolioData;

  const renderSocialIcon = (iconName) => {
    switch (iconName) {
      case 'Github': return <GithubIcon size={18} />;
      case 'Twitter': return <TwitterIcon size={18} />;
      case 'Linkedin': return <LinkedinIcon size={18} />;
      case 'Discord': return <DiscordIcon size={18} />;
      case 'Mail': return <MailIcon size={18} />;
      default: return null;
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-status-pill">
        <span className="pulse-dot"></span>
        <span>{profile.statusText}</span>
      </div>

      <div className="hero-main">
        <div className="hero-text">
          <p className="section-tag">
            <SparklesIcon size={14} />
            {profile.title}
          </p>

          <h1>
            Hi, I'm <span className="gradient-text">{profile.name}</span>
          </h1>

          <p className="bio">{profile.bio}</p>

          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">
              Explore Projects
            </a>
            <a href="#contact" className="btn btn-secondary">
              Get in Touch
            </a>
          </div>

          <div className="hero-socials">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn"
                title={social.name}
                aria-label={social.name}
              >
                {renderSocialIcon(social.icon)}
              </a>
            ))}
          </div>
        </div>

        <div className="hero-avatar-wrapper">
          <div className="avatar-card">
            <img src={profile.avatarUrl} alt={profile.name} />
            <div className="avatar-badge">
              <span style={{ fontWeight: 600 }}>{profile.location}</span>
              <span style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>● Online</span>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card stat-card">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
