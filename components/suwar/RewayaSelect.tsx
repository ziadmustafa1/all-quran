'use client';

interface RewayaSelectProps {
  rewayat: string[];
  selectedRewaya: string;
  onSelect: (rewaya: string) => void;
}

export default function RewayaSelect({ rewayat, selectedRewaya, onSelect }: RewayaSelectProps) {
  return (
    <select
      value={selectedRewaya}
      onChange={(e) => onSelect(e.target.value)}
      className="w-full text-black p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-[#2d4b2d]"
      dir="rtl"
    >
      <option value="">كل الروايات</option>
      {rewayat.map((rewaya) => (
        <option key={rewaya} value={rewaya} className="text-black">
          {rewaya}
        </option>
      ))}
    </select>
  );
} 