'use client';

import { AVAILABLE_LANGUAGES, AVAILABLE_REWAYAT } from '../../services/quran';

interface FiltersProps {
  onFilterChange: (filters: {
    language?: string;
    rewaya?: number;
    sura?: number;
  }) => void;
}

export default function ReciterFilters({ onFilterChange }: FiltersProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <select
        onChange={(e) => onFilterChange({ language: e.target.value })}
        className="p-2 rounded-lg border text-black border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2a2a2a]"
        dir="rtl"
      >
        <option value="">اختر اللغة</option>
        {AVAILABLE_LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => onFilterChange({ rewaya: Number(e.target.value) })}
        className="p-2 rounded-lg border text-black border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2a2a2a]"
        dir="rtl"
      >
        <option value="">اختر الرواية</option>
        {AVAILABLE_REWAYAT.map((rewaya) => (
          <option key={rewaya.id} value={rewaya.id}>
            {rewaya.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        min="1"
        max="114"
        placeholder="رقم السورة"
        onChange={(e) => onFilterChange({ sura: Number(e.target.value) })}
        className="p-2 rounded-lg border text-black border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2a2a2a]"
        dir="rtl"
      />
    </div>
  );
} 