'use client';

import { Reciter } from '../../types';

interface ReciterSelectProps {
  reciters: Reciter[];
  onSelect: (reciter: Reciter) => void;
}

export default function ReciterSelect({ reciters, onSelect }: ReciterSelectProps) {
  return (
    <select
      className="w-full text-black p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-[#2d4b2d]"
      onChange={(e) => {
        const reciter = reciters.find(r => r.id === Number(e.target.value));
        if (reciter) onSelect(reciter);
      }}
      dir="rtl"
    >
      <option value="">اختر القارئ</option>
      {reciters.map((reciter) => (
        <option key={reciter.id} value={reciter.id} className="text-black">
          {reciter.name} - {reciter.rewaya}
        </option>
      ))}
    </select>
  );
} 