interface Narrator {
  name: string;
  slug: string;
  total: number;
}

interface Hadith {
  number: number;
  arab: string;
  id: string;
}

interface PaginationInfo {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  startPage: number;
  endPage: number;
  startIndex: number;
  endIndex: number;
  pages: number[];
}

interface HadithResponse {
  name: string;
  slug: string;
  total: number;
  pagination: PaginationInfo;
  items: Hadith[];
} 