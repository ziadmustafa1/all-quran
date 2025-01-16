export interface Moshaf {
  name: string;
  server: string;
  surah_total?: number;
}

export interface Sura {
  id: number;
  name: string;
  url: string;
  fileSize?: number;
}

export interface Reciter {
  id: number;
  name: string;
  letter: string;
  rewaya: string[];
  suras?: Sura[];
  moshaf?: Moshaf[];
}

export interface APIAudioFile {
  id: number;
  chapter_id: number;
  file_size: number;
  format: string;
  audio_url: string;
}
