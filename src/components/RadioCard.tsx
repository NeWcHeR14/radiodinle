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
      <div className={`relative glass-panel rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20 ${isCurrent ? 'ring-2 ring-primary' : 'border-transparent'}`}>
        
        {/* Aspect Ratio Container for Logo */}
        <div className="relative aspect-square w-full bg-secondary/50 p-6 flex items-center justify-center group-hover:bg-secondary/70 transition-colors">
          <div className="relative w-full h-full rounded-full overflow-hidden shadow-lg border-4 border-card">
            <Image
              src={radio.logoUrl}
              alt={radio.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>
          
          {/* Play Overlay */}
          <div className={`absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isCurrent ? 'opacity-100 bg-black/60' : ''}`}>
            <button
              onClick={handlePlayClick}
              className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-primary/30"
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
            <div className="absolute top-4 right-4 flex items-end gap-1 h-4">
              <div className="w-1 bg-primary rounded-full animate-[equalize_1s_infinite_ease-in-out_0.2s] h-4"></div>
              <div className="w-1 bg-primary rounded-full animate-[equalize_1s_infinite_ease-in-out_0.4s] h-2"></div>
              <div className="w-1 bg-primary rounded-full animate-[equalize_1s_infinite_ease-in-out_0.6s] h-3"></div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 text-center">
          <h3 className="font-bold text-foreground text-lg mb-1 truncate">{radio.name}</h3>
          <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full font-medium">
            {radio.category}
          </span>
        </div>
      </div>
    </Link>
  );
}
