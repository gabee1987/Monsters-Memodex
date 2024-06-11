import React, { createContext, useContext, useState, useEffect } from 'react';

import { themes } from '../app-themes/app-themes';

export const ThemeContext = createContext({
  isDarkMode: false,
  setIsDarkMode: () => {},
  theme: themes.default.dark,
  setTheme: () => {},
  appBackground: themes.default.dark,
  setAppBackground: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [theme, setTheme] = useState(themes.default.dark);
  const [appBackground, setAppBackground] = useState(themes.default.dark);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    applyBackground(appBackground);
  }, [appBackground]);

  useEffect(() => {
    toggleTheme(theme.name, isDarkMode ? 'dark' : 'light');
  }, [isDarkMode, theme.name]);

  const toggleTheme = (themeName, mode) => {
    const newTheme = themes[themeName][mode];
    // console.log('Theme selected in context: ', newTheme);
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  const applyTheme = (theme, background) => {
    Object.keys(theme).forEach((key) => {
      if (key !== 'backgroundClass') {
        document.documentElement.style.setProperty(`--${key}`, theme[key]);
      }
    });
    document.body.className = `${theme.mode} ${theme.backgroundClass}`;
    console.log('Theme applied: ', theme);
  };

  const applyBackground = (background) => {
    document.body.className = background;
    // document.body.style.backgroundImage = theme.backgroundImage;
  };

  const value = {
    isDarkMode,
    setIsDarkMode,
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
