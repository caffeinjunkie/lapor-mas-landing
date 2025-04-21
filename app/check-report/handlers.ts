export const appendParams = (params: Record<string, string>) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    searchParams.set(key, value);
  });
  return searchParams.toString();
};

export const isEmptyError = (error: unknown) => {
  return (error as Record<string, unknown>).code === "PGRST116";
};