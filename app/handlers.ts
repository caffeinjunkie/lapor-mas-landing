export const saveTemporaryData = (data: Record<string, any>) => {
  localStorage.setItem("temporaryData", JSON.stringify(data));
};

export const deleteTemporaryData = () => {
  localStorage.removeItem("temporaryData");
};

export const getTemporaryData = () => {
  return JSON.parse(localStorage.getItem("temporaryData") || "{}");
};
