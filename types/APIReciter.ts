export interface APIReciter {
  id: number;
  name: string;
  letter: string;
  rewaya: string;
  moshaf?: Array<{
    server: string;
    surah_total?: number;
  }>;
} 