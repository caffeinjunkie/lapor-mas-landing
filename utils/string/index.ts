const getByteSize = (size: number) => {
  if (size < 500000) {
    return (size / 1024).toFixed(0) + "KB";
  }
  return (size / 1048576).toFixed(2) + "MB";
};

const getCategory = (category: string) => {
  switch (category) {
    case "kebijakan-publik":
      return "Kebijakan Publik, Peraturan Daerah, Peraturan Pemerintah";
    case "kondisi-jalan":
      return "Kondisi Jalan, Jalan rusak, Jalan tidak rapi, Jalan tidak aman";
    case "fasilitas-umum":
      return "Fasilitas Umum, Taman, Halte, Stasiun";
    case "makanan-bergizi":
      return "Makanan Bergizi, Makanan Sehat, Makanan Bergizi Gratis (MBG)";
    case "program-pemerintah":
      return "Program Pemerintah, Undang-undang, Peraturan Pemerintah";
    case "keamanan":
      return "Keamanan, Kemalingan, Ronda";
    case "pungli":
      return "Pungutan Liar";
    case "lainnya":
      return "Lainnya";
    default:
      return "Lainnya";
  }
};

const getStrictness = (category: string) => {
  switch (category) {
    case "kebijakan-publik":
      return 51;
    case "kondisi-jalan":
      return 80;
    case "fasilitas-umum":
      return 80;
    case "makanan-bergizi":
      return 80;
    case "program-pemerintah":
      return 50;
    case "keamanan":
      return 80;
    case "pungli":
      return 51;
    case "lainnya":
      return 20;
    default:
      return 100;
  }
};

export { getByteSize, getCategory, getStrictness };
