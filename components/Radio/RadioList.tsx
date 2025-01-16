'use client';

import { useState, useEffect } from 'react';
import { Radio } from '@/types/Radio';
import { fetchRadioStations } from '@/services/radioService';
import AudioPlayer from '../suwar/AudioPlayer';

type FilterType = 'all' | 'quran' | 'translation' | 'other';

export default function RadioList() {
  const [stations, setStations] = useState<Radio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [playingStationId, setPlayingStationId] = useState<number | null>(null);
  const [volume, setVolume] = useState(1);
  const [filterType, setFilterType] = useState<FilterType>('all');

  useEffect(() => {
    loadStations();
  }, []);

  const loadStations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchRadioStations('ar');
      setStations(data);
    } catch (err) {
      setError('حدث خطأ في تحميل المحطات');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayPause = (stationId: number) => {
    setPlayingStationId(playingStationId === stationId ? null : stationId);
  };

  const getStationType = (name: string): FilterType => {
    if (name.includes('ترجمة')) return 'translation';
    if (name.startsWith('--') || name.includes('تفسير') || name.includes('أذكار')) return 'other';
    return 'quran';
  };

  const filteredStations = stations.filter(station => {
    const matchesSearch = station.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || getStationType(station.name) === filterType;
    return matchesSearch && matchesType;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#2d4b2d] border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>{error}</p>
        <button 
          onClick={loadStations}
          className="mt-4 px-4 py-2 bg-[#2d4b2d] text-white rounded-lg hover:bg-[#1f331f]"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="ابحث عن محطة..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-black p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800"
        />
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4  py-2 rounded-lg transition-colors ${
              filterType === 'all' 
                ? 'bg-[#2d4b2d] text-white' 
                : 'bg-gray-100 text-black dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            الكل
          </button>
          <button
            onClick={() => setFilterType('quran')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterType === 'quran' 
                ? 'bg-[#2d4b2d] text-white' 
                : 'bg-gray-100 text-black dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            القرآن الكريم
          </button>
          <button
            onClick={() => setFilterType('translation')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterType === 'translation' 
                ? 'bg-[#2d4b2d] text-white' 
                : 'bg-gray-100 text-black dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            الترجمات
          </button>
          <button
            onClick={() => setFilterType('other')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterType === 'other' 
                ? 'bg-[#2d4b2d] text-white' 
                : 'bg-gray-100 text-black dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            محتوى آخر
          </button>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          {filteredStations.length} محطة
        </div>
      </div>

      <div className="grid gap-4">
        {filteredStations.map(station => (
          <div key={station.id} className="bg-white text-black dark:bg-gray-800 rounded-lg p-4 shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 flex items-center justify-center bg-[#2d4b2d] text-white rounded-full text-lg font-semibold">
                  {station.id}
                </span>
                <h3 className="text-lg font-semibold">{station.name}</h3>
              </div>
              
              <button
                onClick={() => handlePlayPause(station.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2d4b2d] text-white hover:bg-[#1f331f] transition-colors"
              >
                {playingStationId === station.id ? 'إيقاف' : 'تشغيل'}
              </button>
            </div>

            {playingStationId === station.id && (
              <AudioPlayer
                url={station.url}
                suraId={station.id}
                suraName={station.name}
                isPlaying={true}
                onPlayPause={() => handlePlayPause(station.id)}
                onEnded={() => setPlayingStationId(null)}
                volume={volume}
                onVolumeChange={setVolume}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 