import { APIReciter } from '../types/APIReciter';

const API_BASE_URL = 'https://mp3quran.net/api/v3';



export const getReciters = async ({ language = 'ar' }) => {
  try {
    const response = await fetch(`https://www.mp3quran.net/api/v3/reciters?language=${language}`);
    const data = await response.json();
    return data.reciters.map((reciter: APIReciter) => ({
      ...reciter,
      rewaya: reciter.rewaya || 'حفص عن عاصم' // قيمة افتراضية للرواية
    }));
  } catch (error) {
    console.error('Error fetching reciters:', error);
    return [];
  }
};

// واجهة للغات المتاحة
export const AVAILABLE_LANGUAGES = [
  { code: 'ar', name: 'العربية' },
  { code: 'eng', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'ru', name: 'Русский' },
  // ... باقي اللغات
] as const;

// واجهة للروايات المتاحة
export const AVAILABLE_REWAYAT = [
  { id: 1, name: 'حفص عن عاصم' },
  { id: 2, name: 'ورش عن نافع' },
  { id: 3, name: 'قالون عن نافع' },
  // ... باقي الروايات
] as const;

export async function getSuwar() {
  try {
    const response = await fetch('https://mp3quran.net/api/v3/suwar');
    const data = await response.json();
    return data.suwar;
  } catch (error) {
    console.error('Error fetching suwar:', error);
    return [];
  }
}

export async function getRiwayat() {
  try {
    const response = await fetch(`${API_BASE_URL}/riwayat`);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.riwayat;
  } catch (error) {
    console.error('Error fetching riwayat:', error);
    throw error;
  }
}

export async function getMoshaf(reciterId: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/moshaf/${reciterId}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching moshaf:', error);
    throw error;
  }
}

// دالة مساعدة لتحويل بيانات القارئ إلى الشكل المطلوب في التطبيق
export function transformReciterData(reciter: APIReciter) {
  if (!reciter) return null;
  
  const moshaf = reciter.moshaf?.[0];
  if (!moshaf) return null;

  return {
    id: reciter.id,
    name: reciter.name,
    letter: reciter.letter,
    rewaya: reciter.rewaya,
    server: moshaf.server,
    count: moshaf.surah_total || 114,
    suras: Array.from({ length: moshaf.surah_total || 114 }, (_, i) => ({
      id: i + 1,
      name: SURA_NAMES[i],
      url: `${moshaf.server}/${(i + 1).toString().padStart(3, '0')}.mp3`
    }))
  };
}

// أسماء السور القرآنية
const SURA_NAMES = [
  "الفاتحة", "البقرة", "آل عمران", "النساء", "المائدة", "الأنعام", "الأعراف", "الأنفال", "التوبة", "يونس",
  "هود", "يوسف", "الرعد", "إبراهيم", "الحجر", "النحل", "الإسراء", "الكهف", "مريم", "طه",
  "الأنبياء", "الحج", "المؤمنون", "النور", "الفرقان", "الشعراء", "النمل", "القصص", "العنكبوت", "الروم",
  "لقمان", "السجدة", "الأحزاب", "سبأ", "فاطر", "يس", "الصافات", "ص", "الزمر", "غافر",
  "فصلت", "الشورى", "الزخرف", "الدخان", "الجاثية", "الأحقاف", "محمد", "الفتح", "الحجرات", "ق",
  "الذاريات", "الطور", "النجم", "القمر", "الرحمن", "الواقعة", "الحديد", "المجادلة", "الحشر", "الممتحنة",
  "الصف", "الجمعة", "المنافقون", "التغابن", "الطلاق", "التحريم", "الملك", "القلم", "الحاقة", "المعارج",
  "نوح", "الجن", "المزمل", "المدثر", "القيامة", "الإنسان", "المرسلات", "النبأ", "النازعات", "عبس",
  "التكوير", "الانفطار", "المطففين", "الانشقاق", "البروج", "الطارق", "الأعلى", "الغاشية", "الفجر", "البلد",
  "الشمس", "الليل", "الضحى", "الشرح", "التين", "العلق", "القدر", "البينة", "الزلزلة", "العاديات",
  "القارعة", "التكاثر", "العصر", "الهمزة", "الفيل", "قريش", "الماعون", "الكوثر", "الكافرون", "النصر",
  "المسد", "الإخلاص", "الفلق", "الناس"
]; 