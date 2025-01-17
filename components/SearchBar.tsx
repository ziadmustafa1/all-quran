'use client';

import { Surah } from '@/lib/types';

interface SearchBarProps {
  searchQuery: string;
  searchType: 'text' | 'number' | 'page';
  onSearchChange: (query: string) => void;
  onTypeChange: (type: 'text' | 'number' | 'page') => void;
  currentSurah: Surah | undefined;
}

export default function SearchBar({
  searchQuery,
  searchType,
  onSearchChange,
  onTypeChange,
  currentSurah
}: SearchBarProps) {
  return (
    <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 w-full">
          <input
            type="text"
            placeholder={
              searchType === 'number' 
                ? "ابحث برقم الآية..." 
                : searchType === 'page'
                ? "ابحث برقم الصفحة..."
                : "ابحث في نص الآيات..."
            }
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full p-2 border rounded-md text-right text-[#2d4b2d]"
            dir="rtl"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onTypeChange('text')}
            className={`px-4 py-2 rounded-md ${
              searchType === 'text' 
                ? 'bg-[#2d4b2d] text-white' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            بحث بالنص
          </button>
          <button
            onClick={() => onTypeChange('number')}
            className={`px-4 py-2 rounded-md ${
              searchType === 'number' 
                ? 'bg-[#2d4b2d] text-white' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            بحث بالرقم
          </button>
          <button
            onClick={() => onTypeChange('page')}
            className={`px-4 py-2 rounded-md ${
              searchType === 'page' 
                ? 'bg-[#2d4b2d] text-white' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            بحث بالصفحة
          </button>
        </div>
      </div>
      {searchType === 'page' && currentSurah && (
        <div className="mt-2 text-sm text-gray-600 text-right">
          نطاق الصفحات في هذه السورة: {currentSurah.start_page} - {currentSurah.end_page}
        </div>
      )}
    </div>
  );
} 