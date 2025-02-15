export interface SessionData {
  title: string;
  description?: string;
  date: string;
  category: string;
  location?: string;
}

/**
 * Save the object to sessionStorage, appending it to the existing array.
 * @param data The data object to store.
 */
export const saveToSessionStorage = (data: SessionData): void => {
  try {
    const existingData = getFromSessionStorage() || [];
    console.log(existingData, data, "ja ncok");
    const updatedDate = [...existingData, data];
    const serializedData = JSON.stringify(updatedDate);
    sessionStorage.setItem("sessionData", serializedData);
  } catch (error) {
    console.error("Could not save data to sessionStorage", error);
  }
};

/**
 * Retrieve all objects from sessionStorage.
 * @returns An array of saved data or an empty array if none is found.
 */
export const getFromSessionStorage = (): SessionData[] => {
  try {
    const serializedData = sessionStorage.getItem("sessionData");
    if (serializedData === null) {
      return [];
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error("Could not retrieve data from sessionStorage", error);
    return [];
  }
};
