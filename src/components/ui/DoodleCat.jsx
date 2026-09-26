import React from 'react';

export default function DoodleCat({ className = "" }) {
  return (
    <div className={`inline-flex items-center justify-center select-none ${className}`}>
      {/* Pixel Art Bunny / Mascot */}
      <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor" className="text-white">
        <path d="M4 1h2v4H4V1zm6 0h2v4h-2V1zM3 5h10v6H3V5zm2 8h6v2H5v-2zM5 7h2v2H5V7zm4 0h2v2H9V7z" />
      </svg>
    </div>
  );
}
