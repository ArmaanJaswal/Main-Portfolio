import React, { useState, useEffect, useRef } from 'react';
import { MapPin, RotateCw, Search, Volume2, VolumeX, Play, Pause, Clock, Globe } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export default function VideoBannerProfile({ onOpenCommand, onShowToast }) {
  const { profile } = portfolioData;
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [timeMode, setTimeMode] = useState('24h'); // '12h' or '24h'
  const [currentTime, setCurrentTime] = useState(new Date());

  const videoRef = useRef(null);
  const audioCtxRef = useRef(null);
  const oscillatorNodesRef = useRef([]);

  // Cosmic Voyage video configuration
  const cosmicPreset = profile.bannerPresets[0];

  // Live real-time clock ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time string
  const formatTimeString = (date) => {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    let period = '';

    if (timeMode === '12h') {
      period = hours >= 12 ? ' PM' : ' AM';
      hours = hours % 12 || 12;
    }
    const formattedHours = String(hours).padStart(2, '0');
    return {
      time: `${formattedHours}:${minutes}:${seconds}`,
      period,
      fullDate: date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      })
    };
  };

  const { time, period, fullDate } = formatTimeString(currentTime);

  // Cycle avatar on button click
  const handleCycleAvatar = (e) => {
    e.stopPropagation();
    setAvatarIndex((prev) => (prev + 1) % profile.avatars.length);
    if (onShowToast) onShowToast('Avatar updated!');
  };

  // Toggle play/pause on video
  const togglePlay = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Web Audio API ambient sound generator
  const toggleAmbientSound = (e) => {
    e.stopPropagation();
    if (isMuted) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioCtx();
        }
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }

        const ctx = audioCtxRef.current;
        const freqs = [110, 164.81, 220, 329.63];
        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.04, ctx.currentTime);
        gainNode.connect(ctx.destination);

        const oscNodes = freqs.map((freq) => {
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          osc.connect(gainNode);
          osc.start();
          return osc;
        });

        oscillatorNodesRef.current = { oscNodes, gainNode };
        setIsMuted(false);
        if (onShowToast) onShowToast('Ambient audio enabled 🎵');
      } catch (err) {
        console.error('Audio init error', err);
      }
    } else {
      if (oscillatorNodesRef.current?.oscNodes) {
        oscillatorNodesRef.current.oscNodes.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch (e) {}
        });
        oscillatorNodesRef.current = null;
      }
      setIsMuted(true);
      if (onShowToast) onShowToast('Ambient audio muted');
    }
  };

  return (
    <div id="home" className="space-y-4 pt-1">
      {/* Cosmic Voyage Video Space & Compact Live Timer HUD */}
      <div className="relative w-full h-36 sm:h-44 md:h-48 rounded-xl overflow-hidden border border-[#1f1f1f] bg-[#09090b] shadow-xl group select-none">
        {/* Cosmic Voyage Looping Video */}
        <video
          ref={videoRef}
          src={cosmicPreset.videoUrl}
          poster={cosmicPreset.fallbackImg}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
        />

        {/* Ambient Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40 pointer-events-none" />

        {/* Top Controls Strip */}
        <div className="absolute top-2.5 left-3 right-3 flex items-center justify-between gap-2 z-10">
          {/* Live Indicator */}
          <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-2.5 py-0.5 backdrop-blur-md text-[10px] font-mono-code text-white/90">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-semibold">LIVE</span>
            <span className="text-white/40 hidden sm:inline">•</span>
            <span className="text-white/70 hidden sm:inline">COSMIC VOYAGE</span>
          </div>

          {/* Sound & Play Controls */}
          <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/60 p-0.5 backdrop-blur-md">
            <button
              onClick={toggleAmbientSound}
              className={`p-1 rounded-full transition-colors cursor-pointer ${
                !isMuted ? 'text-cyan-400 bg-cyan-950/40' : 'text-white/60 hover:text-white'
              }`}
              title={isMuted ? 'Turn ambient sound ON' : 'Turn ambient sound OFF'}
            >
              {!isMuted ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
            </button>
            <button
              onClick={togglePlay}
              className="p-1 rounded-full text-white/60 hover:text-white transition-colors cursor-pointer"
              title={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* Bottom HUD: Compact Digital Clock & Date */}
        <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-end justify-between z-10">
          {/* Small Timer & Format Switcher */}
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setTimeMode(timeMode === '24h' ? '12h' : '24h');
                }}
                className="cursor-pointer hover:opacity-90 transition-opacity flex items-baseline gap-1"
                title="Click to toggle 12h/24h"
              >
                <span className="font-mono-code text-2xl sm:text-3xl font-bold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  {time}
                </span>
                {period && (
                  <span className="font-mono-code text-[11px] font-semibold text-cyan-400">
                    {period}
                  </span>
                )}
              </div>

              <span className="rounded border border-white/15 bg-black/50 px-1.5 py-0.5 text-[9px] font-mono-code text-white/70 backdrop-blur-sm">
                {profile.timezoneLabel}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono-code text-white/60 pt-0.5">
              <span>{fullDate}</span>
              <span>•</span>
              <span>{profile.coordinates}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-4">
          {/* Avatar with circular refresh icon */}
          <div className="relative group">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-[#2a2a2a] bg-[#111111] shadow-xl transition-all duration-300 group-hover:border-[#444444]">
              <img
                src={profile.avatars[avatarIndex]}
                alt={profile.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <button
              onClick={handleCycleAvatar}
              className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#1e1e1e] border border-[#3a3a3a] text-[#aaaaaa] hover:text-white hover:border-[#666666] hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-md"
              title="Click to switch avatar"
            >
              <RotateCw className="w-3 h-3" />
            </button>
          </div>

          {/* Name & Subtitles */}
          <div className="space-y-1">
            <h1 className="font-serif-title text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              {profile.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#a0a0a0] font-medium">
              {profile.role}
            </p>
            <div className="flex items-center gap-3 text-[11px] sm:text-xs text-[#666666] font-mono-code pt-0.5">
              <span className="flex items-center gap-1 text-[#888888]">
                <MapPin className="w-3 h-3 text-[#666666]" /> {profile.location}
              </span>
            </div>
          </div>
        </div>

        {/* ⌘K search pill */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenCommand();
          }}
          className="hidden sm:flex items-center gap-2.5 rounded-lg border border-[#222222] bg-[#111111] px-3.5 py-1.5 text-xs text-[#888888] hover:text-white hover:border-[#444444] hover:bg-[#181818] transition-all self-start sm:self-center cursor-pointer font-mono-code shadow-sm"
        >
          <Search className="w-3.5 h-3.5 text-cyan-400" />
          <span>⌘K</span>
        </button>
      </div>
    </div>
  );
}
