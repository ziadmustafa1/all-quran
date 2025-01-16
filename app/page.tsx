'use client';

import { useState, useEffect } from 'react';
import { getReciters } from "../services/quran";
import SearchReciter from "../components/suwar/SearchReciter";
import SurasList from "../components/suwar/SurasList";
import { Reciter } from '../types';
import { getSuraInfo } from '../data/suwar';

export default function Home() {
  const [reciters, setReciters] = useState<Reciter[]>([]);
  const [filteredReciters, setFilteredReciters] = useState<Reciter[]>([]);
  const [selectedReciter, setSelectedReciter] = useState<Reciter | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadReciters = async () => {
      try {
        setIsLoading(true);
        const data = await getReciters({ language: 'ar' });
        setReciters(data);
        setFilteredReciters(data);
        
        // اختيار أول قارئ تلقائياً
        if (data.length > 0) {
          setSelectedReciter(data[0]);
        }
      } catch (error) {
        console.error('Error loading reciters:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadReciters();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = reciters.filter(reciter =>
        reciter.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredReciters(filtered);
    } else {
      setFilteredReciters(reciters);
    }
  }, [searchQuery, reciters]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredReciters(reciters);
      return;
    }

    const filtered = reciters.filter(reciter => 
      reciter.name.toLowerCase().includes(query.toLowerCase()) ||
      (reciter.moshaf && reciter.moshaf[0]?.name.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredReciters(filtered);
  };

  const handleReciterChange = (reciterId: string) => {
    const reciter = reciters.find(r => r.id === Number(reciterId));
    setSelectedReciter(reciter || null);
  };


  const prepareSurasForReciter = (reciter: Reciter) => {
    if (!reciter.moshaf?.[0]) return [];
    
    const { server, surah_total } = reciter.moshaf[0];
    const surasList = Array.from({ length: surah_total || 0 }, (_, i) => i + 1);
    
    return surasList.map(id => {
      const suraInfo = getSuraInfo(id);
      return {
        id,
        name: suraInfo?.name || `سورة ${id}`,
        url: `${server}/${id.toString().padStart(3, '0')}.mp3`,
        start_page: suraInfo?.start_page || 0,
        end_page: suraInfo?.end_page || 0,
        makkia: suraInfo?.makkia || 0,
        type: suraInfo?.type || 0
      };
    });
  };

  return (
    <div className="min-h-screen bg-[#f8f3e9] dark:bg-[#1a1a1a]">
      <header className="py-6 px-4 bg-[#2d4b2d] dark:bg-[#1f331f] text-white sticky top-0 z-10">
        <div className="container mx-auto">
          <h1 className="text-2xl mb-4 text-center">القرآن الكريم</h1>
          <div className="flex justify-between items-center space-x-4">
            <SearchReciter onSearch={handleSearch} />
            <select
              className="w-full p-3 text-black rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-[#2d4b2d] text-lg"
              onChange={(e) => handleReciterChange(e.target.value)}
              value={selectedReciter?.id || ''}
              dir="rtl"
            >
              <option value="" className="text-black">اختر الشيخ...</option>
              {filteredReciters.map(reciter => (
                <option 
                  key={reciter.id} 
                  value={reciter.id} 
                  className="text-black"
                >
                  {`${reciter.name} - ${reciter.moshaf?.[0]?.name || reciter.rewaya || 'حفص عن عاصم'}`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#2d4b2d] border-t-transparent"></div>
            <p className="mt-2">جاري تحميل القراء...</p>
          </div>
        ) : selectedReciter ? (
          <SurasList
            suras={prepareSurasForReciter(selectedReciter)}
            reciterName={selectedReciter.name}
          />
        ) : (
          <div className="text-center py-8">
            <p className="text-xl">الرجاء اختيار قارئ</p>
          </div>
        )}
        
      </main>
    </div>
  );
}
