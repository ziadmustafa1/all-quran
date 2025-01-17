'use client';

import { useState } from 'react';
import { surahs } from '@/data/quran';

interface SurahSelectorProps {
  currentSurah: string;
  onSurahChange: (surahNumber: string) => void;
}

export default function SurahSelector({ currentSurah, onSurahChange }: SurahSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredSurahs = searchQuery
    ? surahs.filter(surah => surah.name.includes(searchQuery))
    : surahs;

  const handleSurahSelect = (surahId: number) => {
    onSurahChange(surahId.toString());
    setIsOpen(false);
  };

  const currentSurahData = surahs.find(s => s.id === parseInt(currentSurah));

  return (
    <div className="relative mb-8 w-full max-w-xl mx-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 bg-[#2d4b2d] text-white rounded-lg shadow-md flex items-center justify-between text-right"
        dir="rtl"
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">
            {currentSurahData ? `سورة ${currentSurahData.name}` : 'اختر سورة'}
          </span>
          {currentSurahData && (
            <span className="text-sm text-white">
              {currentSurahData.makkia ? 'مكية' : 'مدنية'}
            </span>
          )}
        </div>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg">
          <div className="p-4 border-b sticky top-0 bg-white">
            <input
              type="text"
              placeholder="ابحث عن سورة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border rounded-md text-right text-[#2d4b2d]"
              dir="rtl"
            />
          </div>
          <div className="max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2 text-[#2d4b2d]">
              {filteredSurahs.map((surah) => (
                <button
                  key={surah.id}
                  onClick={() => handleSurahSelect(surah.id)}
                  className={`p-3 text-right hover:bg-gray-50 rounded-md flex items-center justify-between
                    ${parseInt(currentSurah) === surah.id ? 'bg-green-50 border border-green-200' : ''}
                  `}
                  dir="rtl"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-medium">{surah.name}</span>
                      <span className="text-sm text-gray-500">
                        {surah.makkia ? 'مكية' : 'مدنية'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      الصفحات: {surah.start_page} - {surah.end_page}
                    </p>
                  </div>
                  <span className="text-2xl font-arabic text-gray-400">
                    {surah.id}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 