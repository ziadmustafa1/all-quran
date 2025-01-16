export const SURA_LIST = [
  {
    id: 1,
    name: "الفاتحة",
    start_page: 1,
    end_page: 1,
    makkia: 1,
    type: 0
  },
  {
    id: 2,
    name: "البقرة",
    start_page: 2,
    end_page: 49,
    makkia: 0,
    type: 1
  },
  {
    id: 3,
    name: "آل عمران",
    start_page: 50,
    end_page: 76,
    makkia: 0,
    type: 1
  },
  // ... باقي السور حتى 114
  {
    id: 114,
    name: "الناس",
    start_page: 604,
    end_page: 604,
    makkia: 1,
    type: 0
  }
] as const;

export function getSuraInfo(id: number) {
  return SURA_LIST.find(sura => sura.id === id);
}

export function getSuraName(id: number) {
  return SURA_LIST.find(sura => sura.id === id)?.name || `سورة ${id}`;
}

export const SURA_NAMES = SURA_LIST.map(sura => sura.name);

export function isMakkia(id: number) {
  return SURA_LIST.find(sura => sura.id === id)?.makkia === 1;
}

export function getPageRange(id: number) {
  const sura = SURA_LIST.find(sura => sura.id === id);
  return sura ? { start: sura.start_page, end: sura.end_page } : null;
}

// تصنيف السور حسب نوعها
export const MAKKI_SURAS = SURA_LIST.filter(sura => sura.makkia === 1);
export const MADANI_SURAS = SURA_LIST.filter(sura => sura.makkia === 0);

// ترتيب السور حسب عدد الصفحات
export const SURAS_BY_LENGTH = [...SURA_LIST].sort((a, b) => 
  (b.end_page - b.start_page) - (a.end_page - a.start_page)
); 