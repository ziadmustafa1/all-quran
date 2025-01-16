'use client';

interface SearchReciterProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchReciter({ onSearch, placeholder = "ابحث عن الشيخ..." }: SearchReciterProps) {
  return (
    <div className="relative">
      <input
        type="text"
        className="w-full p-3 rounded-lg border text-black border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-[#2d4b2d] text-lg"
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
        dir="rtl"
      />
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </span>
    </div>
  );
} 