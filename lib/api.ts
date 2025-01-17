import { TafseerResponse } from './types';

export async function fetchTafseer(surahNumber: string): Promise<TafseerResponse> {
  const res = await fetch(
    `https://quranenc.com/api/v1/translation/sura/arabic_moyassar/${surahNumber}`,
    {
      next: { revalidate: 3600 } // كاش لمدة ساعة
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch tafseer');
  }

  return res.json();
} 