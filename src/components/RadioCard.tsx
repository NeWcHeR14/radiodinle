"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Pause, Loader2 } from "lucide-react";
import { Radio, usePlayer } from "@/context/PlayerContext";

interface RadioCardProps {
  radio: Radio;
}

export default function RadioCard({ radio }: RadioCardProps) {
  const { currentRadio, isPlaying, isLoading, playRadio, togglePlay } = usePlayer();
  
  const isCurrent = currentRadio?.id === radio.id;

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isCurrent) {
      togglePlay();
    } else {
      playRadio(radio);
    }
  };

  return (
    <Link href={`/istasyon/${radio.slug}`} className="group relative block">
      <div className={`relative glass-panel rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] ${isCurrent ? 'ring-2 ring-primary shadow-[0_0_20px_rgba(139,92,246,0.3)]' : 'border-transparent'}`}>
        
        {/* Top Right Live Badge */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 shadow-lg">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[10px] font-bold text-white tracking-wider">CANLI</span>
        </div>

        {/* Aspect Ratio Container for Logo */}
        <div className="relative aspect-square w-full bg-secondary/30 flex items-center justify-center group-hover:bg-secondary/50 transition-colors p-6">
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={radio.logoUrl}
              alt={radio.name}
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-xl"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(radio.name) + "&background=8b5cf6&color=fff&size=256";
              }}
            />
          </div>
          
          {/* Play Overlay */}
          <div className={`absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 ${isCurrent ? 'opacity-100 bg-black/70' : ''}`}>
            <button
              onClick={handlePlayClick}
              className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_15px_rgba(139,92,246,0.5)]"
              aria-label={isCurrent && isPlaying ? "Durdur" : "Oynat"}
            >
              {isCurrent && isLoading && !isPlaying ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : isCurrent && isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current ml-1" />
              )}
            </button>
          </div>
          
          {/* Equalizer animation when playing */}
          {isCurrent && isPlaying && (
            <div className="absolute bottom-4 left-4 flex items-end gap-1 h-4 z-20">
              <div className="w-1 bg-primary rounded-full animate-[equalize_1s_infinite_ease-in-out_0.2s] h-4 shadow-[0_0_5px_rgba(139,92,246,0.8)]"></div>
              <div className="w-1 bg-primary rounded-full animate-[equalize_1s_infinite_ease-in-out_0.4s] h-2 shadow-[0_0_5px_rgba(139,92,246,0.8)]"></div>
              <div className="w-1 bg-primary rounded-full animate-[equalize_1s_infinite_ease-in-out_0.6s] h-3 shadow-[0_0_5px_rgba(139,92,246,0.8)]"></div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 bg-card/80 backdrop-blur-md">
          <h3 className="font-bold text-foreground text-base mb-1.5 truncate">{radio.name}</h3>
          <div className="flex items-center justify-between">
            <span className="inline-block px-2.5 py-0.5 bg-secondary text-secondary-foreground text-[10px] uppercase font-bold tracking-wider rounded-md">
              {radio.category}
            </span>
            <span className="text-[11px] font-medium text-muted-foreground">
              {radio.frequency}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
