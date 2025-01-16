import { Radio, RadioResponse } from '@/types/Radio';

const API_BASE_URL = 'https://mp3quran.net/api/v3';

export async function fetchRadioStations(language?: string): Promise<Radio[]> {
  try {
    const url = new URL(`${API_BASE_URL}/radios`);
    if (language) {
      url.searchParams.append('language', language);
    }

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: RadioResponse = await response.json();
    return data.radios;
  } catch (error) {
    console.error('Error fetching radio stations:', error);
    throw new Error('فشل في تحميل محطات الراديو');
  }
} 