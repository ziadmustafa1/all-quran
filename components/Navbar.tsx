import Link from "next/link";

export function Navbar() {
  return (
    <nav className="shadow-lg top-0 w-full p-4 rtl z-50 sticky bg-[#2d4b2d]">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">القرآن الكريم</div>
        <div className="flex gap-4">
          <Link href="/" className="p-2 hover:bg-gray-100 rounded hover:text-[#2d4b2d] text-white">
            الصفحة الرئيسية
          </Link>
          <Link href="/reciters" className="p-2 hover:bg-gray-100 rounded hover:text-[#2d4b2d] text-white">
            القراء
          </Link>
          <Link href="/favorites" className="p-2 hover:bg-gray-100 rounded hover:text-[#2d4b2d] text-white">
            المفضلة
          </Link>
          <Link href="/adhkar" className="p-2 hover:bg-gray-100 rounded hover:text-[#2d4b2d] text-white"> الأذكار </Link>
          <Link href="/tafseer" className="p-2 hover:bg-gray-100 rounded hover:text-[#2d4b2d] text-white"> تفسير القرآن </Link>
        </div>
      </div>
    </nav>
  );
} 