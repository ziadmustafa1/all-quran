export interface Dhikr {
  category: string;
  count: string;
  description: string;
  reference: string;
  content: string;
}

export interface AdhkarCategory {
  morning: Dhikr[];
  evening: Dhikr[];
  prophets: Dhikr[];
  quran: Dhikr[];
} 