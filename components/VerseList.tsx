'use client';

import { Verse, Surah } from '@/lib/types';

interface VerseListProps {
  verses: Verse[];
  currentSurah: Surah | undefined;
}

export default function VerseList({ verses = [], currentSurah }: VerseListProps) {
  if (!verses || verses.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        لا توجد آيات للعرض
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {verses.map((verse) => (
        <div
          key={verse.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="mb-4">
            <div className="text-xl mb-2 font-arabic text-[#2d4b2d]">
              {verse.arabic_text}
            </div>
            <div className="text-sm text-gray-500 flex justify-between items-center">
              <span>الآية {verse.aya}</span>
              {currentSurah && (
                <span>
                  الصفحة: {currentSurah.start_page + parseInt(verse.aya) - 1}
                </span>
              )}
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
      ))}
    </div>
  );
} 