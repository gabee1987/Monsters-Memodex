const saveToLocalStorage = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error saving to local storage: ${error}`);
    // TODO Handle write error possibly with logs also
  }
};

const loadFromLocalStorage = (key) => {
  try {
    const serializedValue = localStorage.getItem(key);
    return serializedValue ? JSON.parse(serializedValue) : null;
  } catch (error) {
    console.error(`Error loading from local storage: ${error}`);
    // TODO Handle read error possibly with logs also
    return null;
  }
};

const saveCardDeck = (cardDeck) =>
  saveToLocalStorage('inProgressDeck', cardDeck);
const loadCardDeck = () => loadFromLocalStorage('inProgressDeck');

const saveGameMode = (gameMode) => saveToLocalStorage('gameMode', gameMode);
const loadGameMode = () => loadFromLocalStorage('gameMode');

const saveNumberOfPairs = (numberOfPairs) =>
  saveToLocalStorage('numberOfPairs', numberOfPairs);
const loadNumberOfPairs = () => loadFromLocalStorage('numberOfPairs');

const saveTheme = (theme) => saveToLocalStorage('selectedTheme', theme);
const loadTheme = () => loadFromLocalStorage('selectedTheme');

const saveDarkMode = (isDarkMode) =>
  saveToLocalStorage('isDarkMode', isDarkMode);
const loadDarkMode = () => loadFromLocalStorage('isDarkMode');

export const localStorageService = {
  save: saveToLocalStorage,
  load: loadFromLocalStorage,
  saveCardDeck,
  loadCardDeck,
  saveGameMode,
  loadGameMode,
  saveNumberOfPairs,
  loadNumberOfPairs,
  // theme
  saveTheme,
  loadTheme,
  saveDarkMode,
  loadDarkMode,
};
