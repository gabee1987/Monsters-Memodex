const saveToLocalStorage = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    // Handle write error
  }
};

const loadFromLocalStorage = (key) => {
  try {
    const serializedValue = localStorage.getItem(key);
    return serializedValue ? JSON.parse(serializedValue) : null;
  } catch (error) {
    // Handle read error
    return null;
  }
};

export const localStorageService = {
  save: saveToLocalStorage,
  load: loadFromLocalStorage,
};
