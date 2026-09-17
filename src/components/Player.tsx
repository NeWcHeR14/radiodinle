"use client";

import React from "react";
import { usePlayer } from "@/context/PlayerContext";
import { Play, Pause, Volume2, VolumeX, Loader2 } from "lucide-react";
import Image from "next/image";

export default function Player() {
  const { currentRadio, isPlaying, volume, isLoading, error, togglePlay, setVolume } = usePlayer();

  if (!currentRadio) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-white/10 px-4 py-3 md:py-4 safe-area-pb">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Radio Info */}
        <div className="flex items-center gap-3 w-1/3 min-w-[150px]">
          <div className="relative w-12 h-12 rounded-md overflow-hidden bg-secondary flex-shrink-0">
            <img
              src={currentRadio.logoUrl}
              alt={currentRadio.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(currentRadio.name) + "&background=8b5cf6&color=fff&size=128";
              }}
            />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="font-semibold text-sm md:text-base text-foreground truncate">
              {currentRadio.name}
            </span>
            <span className="text-xs text-muted-foreground truncate">
              {currentRadio.category}
            </span>
          </div>
        </div>

        {/* Center: Controls */}
        <div className="flex flex-col items-center justify-center w-1/3">
          <button
            onClick={togglePlay}
            disabled={isLoading && !isPlaying}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 disabled:opacity-70"
            aria-label={isPlaying ? "Durdur" : "Oynat"}
          >
            {isLoading && !isPlaying ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current ml-1" />
            )}
          </button>
          
          {error && (
            <span className="text-[10px] text-red-400 mt-1 absolute -top-5 md:static md:mt-1 w-max">
              {error}
            </span>
          )}
        </div>

        {/* Right: Volume Control & Visualizer */}
        <div className="flex items-center justify-end gap-4 w-1/3 min-w-[120px]">
          <div className={`hidden md:flex bars ${!isPlaying && !isLoading ? 'paused' : ''}`}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          
          <div className="flex items-center gap-2 group relative">
            <button
              onClick={() => setVolume(volume === 0 ? 1 : 0)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={volume === 0 ? "Sesi Aç" : "Sesi Kapat"}
            >
              {volume === 0 ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-16 md:w-24 h-1.5 bg-secondary rounded-full appearance-none cursor-pointer accent-primary hidden md:block"
              aria-label="Ses Seviyesi"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
