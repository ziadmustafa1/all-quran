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
