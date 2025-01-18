import { useState, useEffect } from 'react';

const HadithPage = () => {
  const [narrators, setNarrators] = useState<Narrator[]>([]);
  const [selectedNarrator, setSelectedNarrator] = useState<string>('');
  const [hadiths, setHadiths] = useState<Hadith[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    fetchNarrators();
  }, []);

  useEffect(() => {
    if (selectedNarrator) {
      fetchHadiths(selectedNarrator, currentPage);
    }
  }, [selectedNarrator, currentPage]);

  const fetchNarrators = async () => {
    try {
      const response = await fetch('https://hadis-api-id.vercel.app/hadith/');
      const data = await response.json();
      setNarrators(data);
    } catch (error) {
      console.error('Error fetching narrators:', error);
    }
  };

  const fetchHadiths = async (narrator: string, page: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://hadis-api-id.vercel.app/hadith/${narrator}?page=${page}&limit=10`
      );
      const data: HadithResponse = await response.json();
      setHadiths(data.items);
    } catch (error) {
      console.error('Error fetching hadiths:', error);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">كتب الحديث</h1>
      
      {/* اختيار الراوي */}
      <select 
        value={selectedNarrator}
        onChange={(e) => setSelectedNarrator(e.target.value)}
        className="mb-4 p-2 border rounded"
      >
        <option value="">اختر الراوي</option>
        {narrators.map((narrator) => (
          <option key={narrator.slug} value={narrator.slug}>
            {narrator.name} ({narrator.total})
          </option>
        ))}
      </select>

      {/* عرض الأحاديث */}
      {loading ? (
        <div>جاري التحميل...</div>
      ) : (
        <div className="space-y-4">
          {hadiths.map((hadith) => (
            <div key={hadith.number} className="border p-4 rounded">
              <div className="text-lg mb-2">{hadith.arab}</div>
              <div className="text-gray-600">{hadith.id}</div>
            </div>
          ))}
        </div>
      )}

      {/* التنقل بين الصفحات */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded"
        >
          السابق
        </button>
        <span className="px-4 py-2">صفحة {currentPage}</span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 border rounded"
        >
          التالي
        </button>
      </div>
    </div>
  );
};

export default HadithPage; 