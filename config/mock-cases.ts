export type Case = {
  title: string;
  description: string;
  image?: string;
  date: string;
  category: string;
  location?: string;
};

const mockCases: Case[] = [
  {
    title: "Jalan jeblog Sekamping",
    description: "Gatau nih benerin dong",
    date: "24 July 2024",
    category: "Kondisi Jalan",
    location: "Desa Sukagajadi, Kec. Sekamping",
  },
  {
    title: "Fasilitas Gatau Kenapa",
    description: "Coba nih benerin dong",
    date: "29 July 2024",
    image:
      "https://www.wapresri.go.id/wp-content/uploads/2025/02/IMG_20250205_093750.webp",
    category: "Fasilitas Umum",
    location: "Desa Sukagajadi, Kec. Sekamping",
  },
];
