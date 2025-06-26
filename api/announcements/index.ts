export const fetchAnnouncements = async () => {
  const response = await fetch('/api/announcements');
  return await response.json();
};
