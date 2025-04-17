export const saveTemporaryData = (data: Record<string, any>) => {
  sessionStorage.setItem("temporaryData", JSON.stringify(data));
};

export const deleteTemporaryData = () => {
  sessionStorage.removeItem("temporaryData");
};

export const getTemporaryData = () => {
  return JSON.parse(sessionStorage.getItem("temporaryData") || "{}");
};

export const saveCoordinates = (data: Record<string, any>) => {
  sessionStorage.setItem("coordinates", JSON.stringify(data));
};

export const getCoordinates = () => {
  return JSON.parse(sessionStorage.getItem("coordinates") || "{}");
};
