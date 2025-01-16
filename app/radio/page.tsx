import RadioList from '../../components/Radio/RadioList';

export default function RadioPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#1a1a1a]">
      <div className="py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-black">إذاعات القرآن الكريم</h1>
        <RadioList />
      </div>
    </main>
  );
} 