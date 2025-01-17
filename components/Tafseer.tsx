'use client';

import { useState } from 'react';

interface Verse {
  id: string;
  sura: string;
  aya: string;
  arabic_text: string;
  translation: string;
  footnotes: string | null;
}

interface TafseerProps {
  verses: Verse[];
}

export default function TafseerComponent({ verses }: TafseerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'number' | 'text'>('text');

  const filteredVerses = verses.filter(verse => {
    if (!searchQuery) return true;
    
    if (searchType === 'number') {
      return verse.aya === searchQuery;
    }
    
    return verse.arabic_text.includes(searchQuery);
  });

  return (
    <div>
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 w-full">
            <input
              type="text"
              placeholder={searchType === 'number' ? "ابحث برقم الآية..." : "ابحث في نص الآيات..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border rounded-md text-right text-[#2d4b2d]"
              dir="rtl"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setSearchType('text')}
              className={`px-4 py-2 rounded-md ${
                searchType === 'text' 
                  ? 'bg-[#2d4b2d] text-white' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              بحث بالنص
            </button>
            <button
              onClick={() => setSearchType('number')}
              className={`px-4 py-2 rounded-md ${
                searchType === 'number' 
                  ? 'bg-[#2d4b2d] text-white' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              بحث بالرقم
            </button>
          </div>

        </div>
      </div>

      <div className="grid gap-6">
        {filteredVerses.length > 0 ? (
          filteredVerses.map((verse) => (
            <div
              key={verse.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">
                <div className="text-xl mb-2 font-arabic text-[#2d4b2d]">
                  {verse.arabic_text}
                </div>
                <div className="text-sm text-gray-500">
                  الآية {verse.aya}
                </div>
              </div>
              <div className="text-gray-700 text-lg">
                <h3 className="font-semibold mb-2">التفسير:</h3>
                <p>{verse.translation}</p>
              </div>
              {verse.footnotes && (
                <div className="mt-4 text-sm text-gray-600">
                  <h4 className="font-semibold mb-1">ملاحظات:</h4>
                  <p>{verse.footnotes}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            لا توجد نتائج للبحث
          </div>
        )}
      </div>
    </div>
  );
} 