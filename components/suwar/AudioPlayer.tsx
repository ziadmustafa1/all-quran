'use client';

import { useState, useEffect, useRef } from 'react';

interface AudioPlayerProps {
  url: string;
  suraId: number;
  suraName: string;
  isPlaying: boolean;
  onPlayPause: () => void;
  onEnded: () => void;
  volume: number;
  onVolumeChange: (value: number) => void;
}

export default function AudioPlayer({ 
  url, 
  suraId, 
  suraName, 
  isPlaying,
  onPlayPause,
  onEnded,
  volume,
  onVolumeChange
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const savedProgress = localStorage.getItem(`sura-progress-${suraId}`);
    if (savedProgress && audioRef.current) {
      audioRef.current.currentTime = parseFloat(savedProgress);
      setCurrentTime(parseFloat(savedProgress));
    }
  }, [suraId]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [url]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const playAudio = async () => {
      try {
        if (isPlaying) {
          if (audio.readyState >= 2) {
            await audio.play();
          } else {
            audio.addEventListener('canplay', async () => {
              await audio.play();
            }, { once: true });
          }
        } else {
          audio.pause();
        }
      } catch (error) {
        console.error('خطأ في تشغيل الصوت:', error);
        onPlayPause();
      }
    };
    
    playAudio();

    return () => {
      audio.pause();
    };
  }, [isPlaying, onPlayPause]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      localStorage.setItem(
        `sura-progress-${suraId}`,
        audioRef.current.currentTime.toString()
      );
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-[#2a2a2a] rounded-lg p-4 shadow-lg">
      <audio
        ref={audioRef}
        src={url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={onEnded}
      />

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">{suraName}</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onPlayPause}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-[#2d4b2d] text-white hover:bg-[#1f331f] transition-colors"
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653z" />
              </svg>
            )}
          </button>

          <div className="flex-1">
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
          </div>

          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
            </svg>

            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 