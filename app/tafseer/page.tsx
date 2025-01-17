'use client';

import { useState, useEffect, Suspense } from 'react';
import { surahs } from '@/data/quran';
import TafseerView from './TafseerView';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

async function getTafseer(surahNumber: string) {
  try {
    const res = await fetch(
      `https://quranenc.com/api/v1/translation/sura/arabic_moyassar/${surahNumber}`
    );

    if (!res.ok) throw new Error('Failed to fetch tafseer');
    
    const data = await res.json();
    return data.result || [];
  } catch (error) {
    console.error('Error fetching tafseer:', error);
    return [];
  }
}

// Loading component
function LoadingComponent() {
  return (
    <main className="min-h-screen bg-[#f8f8f8]">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#2d4b2d]">
          تفسير القرآن الكريم
        </h1>
        <div className="text-center py-8 text-gray-500">
          جاري التحميل...
        </div>
      </div>
    </main>
  );
}

// Main content component
function TafseerContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(true);

  // الحصول على رقم السورة الحالية
  const currentSurah = searchParams.get('surah') || '1';
  const surahData = surahs.find(s => s.id === parseInt(currentSurah));

  // تحديث السورة
  const updateSurah = (newSurahNumber: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('surah', newSurahNumber);
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const fetchTafseer = async () => {
      setLoading(true);
      const data = await getTafseer(currentSurah);
      setVerses(data);
      setLoading(false);
    };

    fetchTafseer();
  }, [currentSurah]); // تحديث عند تغيير السورة

  if (loading) {
    return (
      <LoadingComponent />
    );
  }

  if (!verses || verses.length === 0) {
    return (
      <main className="min-h-screen bg-[#f8f8f8]">
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold text-center mb-8 text-[#2d4b2d]">
            تفسير القرآن الكريم
          </h1>
          <div className="text-center py-8 text-gray-500">
            عذراً، لا يمكن تحميل التفسير حالياً. الرجاء المحاولة مرة أخرى.
          </div>
        </div>
      </main>
    );
  }

  return (
    <TafseerView 
      verses={verses} 
      currentSurah={surahData}
      surahNumber={currentSurah}
      onSurahChange={updateSurah}
    />
  );
}

// Main page component
export default function TafseerPage() {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <TafseerContent />
    </Suspense>
  );
} 