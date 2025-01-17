import Adhkar from '@/components/Adhkar';

async function getAdhkar() {
  try {
    const res = await fetch('https://raw.githubusercontent.com/nawafalqari/azkar-api/56df51279ab6eb86dc2f6202c7de26c8948331c1/azkar.json');
    const text = await res.text();
    // Clean the text before parsing
    const cleanedText = text.replace(/\\n/g, '')
                           .replace(/\\'/g, "'")
                           .replace(/\s+/g, ' ')
                           .trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error('Error fetching adhkar:', error);
    // Return empty default structure if fetch fails
    return {
      'أذكار الصباح': [],
      'أذكار المساء': [],
      'أدعية الأنبياء': []
    };
  }
}

export default async function AdhkarPage() {
  const adhkar = await getAdhkar();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-black">Daily Adhkar</h1>
        <Adhkar adhkar={adhkar} />
      </div>
    </main>
  );
} 