export interface Surah {
  id: number;
  name: string;
  start_page: number;
  end_page: number;
  makkia: number;
  type: number;
}

export interface Verse {
  id: string;
  sura: string;
  aya: string;
  arabic_text: string;
  translation: string;
  footnotes: string | null;
  page?: number;
}

export interface TafseerResponse {
  code: number;
  status: string;
  data: Verse[];
} 