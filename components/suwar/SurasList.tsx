'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getSuwar } from '../../services/quran';
import AudioPlayer from './AudioPlayer';

interface Sura {
  id: number;
  name: string;
  url: string;
  start_page: number;
  end_page: number;
  makkia: number;
  type: number;
}

interface SurasListProps {
  suras: Sura[];
  reciterName: string;
}

export default function SurasList({ suras, reciterName }: SurasListProps) {
  const [suwarDetails, setSuwarDetails] = useState<Sura[]>([]);
  const [playingSuraId, setPlayingSuraId] = useState<number | null>(null);
  const [volume, setVolume] = useState(() => {
    const savedVolume = localStorage.getItem('audio-volume');
    return savedVolume ? parseFloat(savedVolume) : 1;
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadSuwarDetails = async () => {
      const data = await getSuwar();
      setSuwarDetails(data);
    };
    
    loadSuwarDetails();
  }, []);

  useEffect(() => {
    localStorage.setItem('audio-volume', volume.toString());
  }, [volume]);

  const handlePlayPause = (suraId: number) => {
    setPlayingSuraId(playingSuraId === suraId ? null : suraId);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  const getSuraDetails = (id: number) => {
    return suwarDetails.find(s => s.id === id) || {
      name: `سورة ${id}`,
      start_page: 0,
      end_page: 0,
      makkia: 1,
      type: 0
    };
  };

  const filteredSuras = suras.filter(sura => {
    const suraDetails = getSuraDetails(sura.id);
    return suraDetails.name.includes(searchQuery) ||
           (searchQuery === 'مكية' && suraDetails.makkia === 1) ||
           (searchQuery === 'مدنية' && suraDetails.makkia === 0);
  });

  return (
    <div className="space-y-6">
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          className="flex-1 text-black p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-[#2d4b2d]"
          placeholder="ابحث عن السورة..."
          onChange={(e) => setSearchQuery(e.target.value)}
          dir="rtl"
        />
        <select
          className="p-3 text-black rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-[#2d4b2d]"
          onChange={(e) => setSearchQuery(e.target.value === 'all' ? '' : e.target.value)}
          dir="rtl"
        >
          <option value="all" className="text-black">الكل</option>
          <option value="مكية" className="text-black">السور المكية</option>
          <option value="مدنية" className="text-black">السور المدنية</option>
        </select>
      </div>

      <div className="space-y-2">
        {filteredSuras.map((sura) => {
          const suraDetails = getSuraDetails(sura.id);
          const isPlaying = playingSuraId === sura.id;

          return (
            <div key={sura.id} className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white dark:bg-[#2a2a2a] rounded-lg">
                <div className="flex items-center gap-4">
                  <span className="w-12 h-12 flex items-center justify-center bg-[#2d4b2d] dark:bg-[#1f331f] text-white rounded-full text-lg font-semibold">
                    {sura.id}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-600 text-center">{suraDetails.name}</h3>
                    <div className="text-sm text-gray-600 dark:text-gray-400 space-x-4 rtl:space-x-reverse">
                      <span>{suraDetails.makkia ? "مكية" : "مدنية"}</span>
                      <span>•</span>
                      <span>الصفحات: {suraDetails.start_page} - {suraDetails.end_page}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handlePlayPause(sura.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2d4b2d] text-white hover:bg-[#1f331f] transition-colors"
                  >
                    <Image 
                      src={isPlaying ? "/pause.svg" : "/play.svg"}
                      alt={isPlaying ? "إيقاف" : "تشغيل"}
                      width={20}
                      height={20}
                      className="invert"
                    />
                    <span>{isPlaying ? "إيقاف" : "تشغيل"}</span>
                  </button>
                  
                  <a
                    href={sura.url}
                    download={`${reciterName}-${suraDetails.name}.mp3`}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#2d4b2d] text-[#2d4b2d] dark:text-white hover:bg-[#2d4b2d] hover:text-white transition-colors"
                    title="تحميل السورة"
                  >
                    <Image 
                      src="/download.svg"
                      alt="تحميل"
                      width={20}
                      height={20}
                      className="dark:invert group-hover:invert"
                    />
                    <span>تحميل</span>
                  </a>
                </div>
              </div>
              
              {isPlaying && (
                <AudioPlayer
                  url={sura.url}
                  suraId={sura.id}
                  suraName={suraDetails.name}
                  isPlaying={isPlaying}
                  onPlayPause={() => handlePlayPause(sura.id)}
                  onEnded={() => setPlayingSuraId(null)}
                  volume={volume}
                  onVolumeChange={handleVolumeChange}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
} 