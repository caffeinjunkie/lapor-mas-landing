export const saveToSessionStorage = (name: string, data: any): void => {
  try {
    const existingData = getFromSessionStorage(name) || [];
    const updatedDate = [...existingData, data];
    const serializedData = JSON.stringify(updatedDate);

    sessionStorage.setItem(name, serializedData);
  } catch (error) {
    console.error(`Could not save ${name} to sessionStorage`, error);
  }
};

export const clearSessionStorage = (name: string): void => {
  try {
    sessionStorage.removeItem(name);
  } catch (error) {
    console.error(`Could not clear ${name} from sessionStorage`, error);
  }
};

export const getFromSessionStorage = (name: string): any[] => {
  try {
    const serializedData = sessionStorage.getItem(name);

    if (serializedData === null) {
      return [];
    }

    return JSON.parse(serializedData);
  } catch (error) {
    console.error(`Could not retrieve ${name} from sessionStorage`, error);

    return [];
  }
};
