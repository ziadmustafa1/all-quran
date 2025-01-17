'use client';

import { Verse, Surah } from '@/lib/types';
import SurahSelector from '@/components/SurahSelector';
import VerseList from '@/components/VerseList';
import SearchBar from '@/components/SearchBar';
import { useState, useMemo } from 'react';

interface TafseerViewProps {
  verses: Verse[];
  currentSurah: Surah | undefined;
  surahNumber: string;
  onSurahChange: (surahNumber: string) => void;
}

export default function TafseerView({ 
  verses = [], 
  currentSurah, 
  surahNumber,
  onSurahChange 
}: TafseerViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'text' | 'number' | 'page'>('text');

  const filteredVerses = useMemo(() => {
    if (!searchQuery) return verses;
    if (!verses) return [];
    
    return verses.filter(verse => {
      switch (searchType) {
        case 'number':
          return verse.aya === searchQuery;
        case 'page':
          const page = parseInt(searchQuery);
          return currentSurah && 
                 page >= currentSurah.start_page && 
                 page <= currentSurah.end_page;
        default:
          return verse.arabic_text.includes(searchQuery);
      }
    });
  }, [verses, searchQuery, searchType, currentSurah]);

  return (
    <main className="min-h-screen bg-[#f8f8f8]">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#2d4b2d]">
          تفسير القرآن الكريم
        </h1>
        
        <SurahSelector 
          currentSurah={surahNumber} 
          onSurahChange={onSurahChange}
        />
        
        <SearchBar
          searchQuery={searchQuery}
          searchType={searchType}
          onSearchChange={setSearchQuery}
          onTypeChange={setSearchType}
          currentSurah={currentSurah}
        />
        
        <VerseList 
          verses={filteredVerses} 
          currentSurah={currentSurah}
        />
      </div>
    </main>
  );
} 