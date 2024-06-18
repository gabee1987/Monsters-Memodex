import React, { createContext, useContext, useState, useEffect } from 'react';

import { themes } from '../app-themes/app-themes';
import { backgrounds } from '../app-themes/app-backgrounds';
import { insertBackgroundCSSClass } from '../utilities/background-helper';
import { localStorageService } from '../services/local-storage.service';

export const ThemeContext = createContext({
  isDarkMode: true,
  setIsDarkMode: () => {},
  theme: themes.default.dark,
  setTheme: () => {},
  appBackground: backgrounds[themes.default.dark.backgroundClass],
  setAppBackground: () => {},
});

export const ThemeProvider = ({ children }) => {
  const storedTheme = localStorageService.loadTheme() || themes.default.dark;
  const storedDarkMode = localStorageService.loadDarkMode() || true;

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [theme, setTheme] = useState(storedTheme);
  const [appBackground, setAppBackground] = useState(
    backgrounds[themes.default.dark.backgroundClass]
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    applyBackground(appBackground.className);
    // console.log('appBackground in context: ', appBackground);
  }, [appBackground]);

  useEffect(() => {
    toggleTheme(theme.name, isDarkMode ? 'dark' : 'light');
  }, [isDarkMode, theme.name]);

  const toggleTheme = (themeName, mode) => {
    const newTheme = themes[themeName][mode];
    // console.log('Theme selected in context: ', newTheme);
    setTheme(newTheme);
    applyTheme(newTheme);
    applyBackground(newTheme.backgroundClass);
    localStorageService.saveTheme(newTheme);
  };

  const applyTheme = (theme, background) => {
    Object.keys(theme).forEach((key) => {
      if (key !== 'backgroundClass') {
        document.documentElement.style.setProperty(`--${key}`, theme[key]);
      }
    });
    document.body.className = `${theme.name}-${theme.mode}`;
    // console.log('Theme applied: ', theme);
  };

  const applyBackground = (backgroundClassName) => {
    const newBackground = backgrounds[backgroundClassName];

    // Insert the CSS class dynamically
    insertBackgroundCSSClass(
      newBackground.className,
      newBackground.svg,
      newBackground.color
    );

    const appBackgroundElement = document.querySelector('.app-background');
    appBackgroundElement.className = `app-background ${newBackground.className}`;
    // Apply the CSS class to the body
    // document.body.className = `${theme.name}-${theme.mode} ${newBackground.className}`;
  };

  const toggleDarkMode = (isDarkMode) => {
    setIsDarkMode(isDarkMode);
    localStorageService.saveDarkMode(isDarkMode);
  };

  const value = {
    isDarkMode,
    setIsDarkMode: toggleDarkMode,
    appBackground,
    setAppBackground,
    theme,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
