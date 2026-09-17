"use client";

import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import Hls from "hls.js";

export interface Radio {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  streamUrl: string;
  category: string;
  description: string;
  frequency: string;
}

interface PlayerContextType {
  currentRadio: Radio | null;
  isPlaying: boolean;
  volume: number;
  isLoading: boolean;
  error: string | null;
  playRadio: (radio: Radio) => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentRadio, setCurrentRadio] = useState<Radio | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;
    
    const audio = audioRef.current;

    const handlePlaying = () => {
      setIsLoading(false);
      setIsPlaying(true);
      setError(null);
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    const handleError = (e: Event) => {
      console.error("Audio playback error:", e);
      setIsLoading(false);
      setIsPlaying(false);
      setError("Yayın şu anda başlatılamıyor. Lütfen daha sonra tekrar deneyin.");
    };

    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("error", handleError);
      audio.pause();
      audio.src = "";
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, []);

  const playRadio = (radio: Radio) => {
    if (!audioRef.current) return;
    
    // If it's the same radio and it's already playing, do nothing.
    if (currentRadio?.id === radio.id) {
      if (!isPlaying) {
        audioRef.current.play().catch(e => console.error(e));
      }
      return;
    }

    setCurrentRadio(radio);
    setIsLoading(true);
    setError(null);
    
    const audio = audioRef.current;
    audio.pause();

    // Destroy previous HLS instance if it exists
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    const isM3U8 = radio.streamUrl.includes(".m3u8");

    if (isM3U8 && Hls.isSupported()) {
      // Use hls.js for HLS streams if supported
      const hls = new Hls({
        enableWorker: true,
      });
      
      hlsRef.current = hls;
      hls.loadSource(radio.streamUrl);
      hls.attachMedia(audio);
      
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        audio.play().catch(e => {
          console.error("Play error:", e);
          setIsLoading(false);
          setError("Otomatik oynatma tarayıcı tarafından engellendi.");
        });
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          console.error("HLS fatal error:", data);
          setIsLoading(false);
          setError("Yayın formatı desteklenmiyor veya bağlantı hatası.");
          hls.destroy();
        }
      });
    } else if (isM3U8 && audio.canPlayType("application/vnd.apple.mpegurl")) {
      // Native HLS support (like Safari)
      audio.src = radio.streamUrl;
      audio.load();
      audio.play().catch(e => {
        console.error("Play error:", e);
        setIsLoading(false);
        setError("Otomatik oynatma tarayıcı tarafından engellendi.");
      });
    } else {
      // Standard audio streams (mp3, aac, etc)
      audio.src = radio.streamUrl;
      audio.load();
      audio.play().catch(e => {
        console.error("Play error:", e);
        setIsLoading(false);
        setError("Otomatik oynatma tarayıcı tarafından engellendi.");
      });
    }
  };

  const togglePlay = () => {
    if (!audioRef.current || !currentRadio) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      audioRef.current.play().catch(e => {
        console.error("Toggle play error:", e);
        setIsLoading(false);
      });
    }
  };

  const setVolume = (newVolume: number) => {
    if (!audioRef.current) return;
    const v = Math.max(0, Math.min(1, newVolume));
    audioRef.current.volume = v;
    setVolumeState(v);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentRadio,
        isPlaying,
        volume,
        isLoading,
        error,
        playRadio,
        togglePlay,
        setVolume,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
