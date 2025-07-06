export const fetchAllAdmins = async () => {
  const response = await fetch("/api/admins");
  return await response.json();
};
