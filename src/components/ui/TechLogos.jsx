import React from 'react';

export const TechLogo = ({ name = "", className = "w-6 h-6", color }) => {
  const safeName = (name || "").toLowerCase().trim();

  switch (safeName) {
    case 'html':
    case 'html5':
      return (
        <svg className={className} viewBox="0 0 512 512">
          <path fill="#E34F26" d="M71 460L30 0h452l-41 460-185 52z"/>
          <path fill="#EF652A" d="M256 472l149-41 35-394H256z"/>
          <path fill="#EBEBEB" d="M256 208h-74l-5-57h79V95H118l15 170h123zm0 152l-64-17-4-47h-56l7 89 117 32z"/>
          <path fill="#FFF" d="M256 208v56h70l-7 74-63 17v57l116-32 16-172zm0-113v56h138l5-56z"/>
        </svg>
      );
    case 'css':
    case 'css3':
      return (
        <svg className={className} viewBox="0 0 512 512">
          <path fill="#1572B6" d="M71 460L30 0h452l-41 460-185 52z"/>
          <path fill="#33A9DC" d="M256 472l149-41 35-394H256z"/>
          <path fill="#EBEBEB" d="M256 208h-79l-5-57h84V95H118l15 170h123zm0 152l-64-17-4-47h-56l7 89 117 32z"/>
          <path fill="#FFF" d="M256 95v56h138l-5 57H256v56h74l-7 74-67 18v57l116-32 16-172z"/>
        </svg>
      );
    case 'javascript':
    case 'js':
      return (
        <svg className={className} viewBox="0 0 630 630">
          <rect width="630" height="630" fill="#F7DF1E"/>
          <path d="m423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25.4-38.1-25.4-17.34 0-28.33 11-28.33 25.4 0 17.76 11 24.95 36.4 35.95l14.8 6.34c50.3 21.57 78.7 43.56 78.7 91.8 0 52.9-41.5 82.5-95.6 82.5-52.5 0-86.3-25.8-103.2-61.7zm-209.98 5.5c8.9 15.2 16.9 28.3 36.4 28.3 18.6 0 30.5-7.6 30.5-37.2v-201.29h59.2v202.1c0 61.3-35.9 88.8-88.8 88.8-47.8 0-75.3-25-89.7-58.4z"/>
        </svg>
      );
    case 'react':
    case 'react.js':
      return (
        <svg className={className} viewBox="-11.5 -10.23174 23 20.46348">
          <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
          <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      );
    case 'redux':
    case 'redux.js':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M16.48 4.28C14.73 2.53 12.01 2.22 9.94 3.37L11.54 4.97C12.78 4.41 14.34 4.67 15.36 5.69C16.38 6.71 16.64 8.27 16.08 9.51L17.68 11.11C18.83 9.04 18.23 6.03 16.48 4.28ZM19.72 7.52C17.97 5.77 15.25 5.46 13.18 6.61L14.78 8.21C16.02 7.65 17.58 7.91 18.6 8.93C19.62 9.95 19.88 11.51 19.32 12.75L20.92 14.35C22.07 12.28 21.47 9.27 19.72 7.52ZM4.28 16.48C2.53 14.73 2.22 12.01 3.37 9.94L4.97 11.54C4.41 12.78 4.67 14.34 5.69 15.36C6.71 16.38 8.27 16.64 9.51 16.08L11.11 17.68C9.04 18.83 6.03 18.23 4.28 16.48ZM7.52 19.72C5.77 17.97 5.46 15.25 6.61 13.18L8.21 14.78C7.65 16.02 7.91 17.58 8.93 18.6C9.95 19.62 11.51 19.88 12.75 19.32L14.35 20.92C12.28 22.07 9.27 21.47 7.52 19.72Z" fill="#764ABC"/>
          <circle cx="12" cy="12" r="2.5" fill="#764ABC"/>
        </svg>
      );
    case 'node.js':
    case 'node js':
    case 'node':
      return (
        <svg className={className} viewBox="0 0 128 128">
          <path fill="#539E43" d="M64 8.5L12 38.5v60l52 30 52-30v-60L64 8.5zm35.2 73.1c-2.4 1.4-15.6 9-22 12.7-4.1 2.4-7.4 3.7-10.2 3.7-6.6 0-10.4-4.3-10.4-11.8V53.2c0-7.5 3.8-11.8 10.4-11.8 2.8 0 6.1 1.3 10.2 3.7 6.4 3.7 19.6 11.3 22 12.7 1.3.8 2.1 2.2 2.1 3.8v16.2c0 1.6-.8 3-2.1 3.8z"/>
        </svg>
      );
    case 'express js':
    case 'express':
    case 'express.js':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#18181B"/>
          <text x="12" y="16" fill="#F4F4F5" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">ex</text>
        </svg>
      );
    case 'mongodb':
    case 'mongo':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M12 2C12 2 6.5 7.5 6.5 13.5C6.5 17.5 9.5 21 12 22C14.5 21 17.5 17.5 17.5 13.5C17.5 7.5 12 2 12 2Z" fill="#47A248"/>
          <path d="M12 2V22C14.5 21 17.5 17.5 17.5 13.5C17.5 7.5 12 2 12 2Z" fill="#4CAF50"/>
          <path d="M12 4C12 4 11.8 10 11.8 13C11.8 16 12 20 12 20C12 20 12.2 16 12.2 13C12.2 10 12 4 12 4Z" fill="#FFFFFF"/>
        </svg>
      );
    case 'mysql':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M21.5 12C20.5 8.5 17.5 6 13.5 6C9.5 6 6 8.5 4.5 12C3 15.5 4.5 19 8.5 19C12.5 19 16 17 19.5 15L21.5 12Z" fill="#00758F"/>
          <path d="M14.5 9.5C13.5 8.5 12 8 10.5 8.5C9 9 8 10.5 8 12C8 13.5 9.5 15 11.5 15C13.5 15 15 14 16 12.5" stroke="#F29111" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="17.5" cy="10.5" r="1" fill="#FFFFFF"/>
        </svg>
      );
    case 'web sockets':
    case 'websockets':
    case 'websocket':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#00D8FF" strokeWidth="1.5"/>
          <path d="M8 9L5 12L8 15" stroke="#00D8FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 9L19 12L16 15" stroke="#00D8FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13 7L11 17" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
    case 'webrtc':
    case 'web rtc':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#18181B" stroke="#FF5722" strokeWidth="1.5"/>
          <circle cx="8" cy="10" r="2.5" fill="#FF5722"/>
          <circle cx="16" cy="10" r="2.5" fill="#00BCD4"/>
          <circle cx="12" cy="16" r="2.5" fill="#4CAF50"/>
          <path d="M8 10L16 10L12 16Z" stroke="#FFFFFF" strokeWidth="1" fill="none" opacity="0.6"/>
        </svg>
      );
    case 'docker':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#2496ED">
          <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186H8.1a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-2.928 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H2.208a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185"/>
        </svg>
      );
    case 'git':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#F05032">
          <path d="M2.6 10.59L8.38 4.8a2.53 2.53 0 013.58 0l1.45 1.45L11.5 8.16a1.59 1.59 0 00-.73 1.34 1.62 1.62 0 00.37 1.04L8.8 12.88a1.6 1.6 0 00-1.04-.38 1.62 1.62 0 101.62 1.62c0-.28-.07-.54-.2-.77l2.25-2.25a1.64 1.64 0 001.07.39 1.62 1.62 0 001.62-1.62 1.6 1.6 0 00-.39-1.06l1.89-1.89 3.76 3.76a2.53 2.53 0 010 3.58l-5.78 5.78a2.53 2.53 0 01-3.58 0L2.6 14.17a2.53 2.53 0 010-3.58z"/>
        </svg>
      );
    case 'github':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="#FFFFFF">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      );
    default:
      return (
        <div className={`flex items-center justify-center rounded-md bg-cyan-500/20 text-cyan-400 font-mono-code text-xs font-bold ${className}`}>
          {(safeName.slice(0, 2) || "TS").toUpperCase()}
        </div>
      );
  }
};
