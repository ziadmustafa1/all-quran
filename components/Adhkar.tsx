'use client'
import { useState } from 'react';
import { Dhikr } from '@/types/adhkar';

interface AdhkarProps {
  adhkar: {
    'أذكار الصباح': Dhikr[];
    'أذكار المساء': Dhikr[];
    'أدعية الأنبياء': Dhikr[];
  };
}

export default function Adhkar({ adhkar }: AdhkarProps) {
  const [activeCategory, setActiveCategory] = useState('أذكار الصباح');

  const categories = {
    'أذكار الصباح': 'أذكار الصباح',
    'أذكار المساء': 'أذكار المساء',
    'أدعية الأنبياء': 'أدعية الأنبياء'
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex gap-4 mb-6 text-black">
        {Object.keys(categories).map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-lg ${
              activeCategory === category
                ? 'bg-[#2d4b2d] text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-black'
            }`}
          >
            {categories[category as keyof typeof categories]}
          </button>
        ))}
      </div>

      <div className="grid gap-6">
        {adhkar[activeCategory as keyof typeof adhkar]?.map((dhikr, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-xl text-black mb-4 font-arabic">{dhikr.content}</div>
            {dhikr.description && (
              <p className="text-black mb-2">{dhikr.description}</p>
            )}
            <div className="flex justify-between items-center text-sm text-black">
              {dhikr.reference && <span>{dhikr.reference}</span>}
              {dhikr.count && <span>Repeat: {dhikr.count} times</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 