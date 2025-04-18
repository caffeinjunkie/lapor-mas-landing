export const fetchLocation = async (latitude: string, longitude: string) => {
  const url = `${process.env.NEXT_PUBLIC_KODE_POS_URL}/detect?latitude=${latitude}&longitude=${longitude}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("failed-to-fetch-location");
  }

  return response.json();
};
