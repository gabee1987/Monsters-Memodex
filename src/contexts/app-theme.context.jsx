import React, { createContext, useContext, useState, useEffect } from 'react';

import { themes } from '../app-themes/app-themes';
import { backgrounds } from '../app-themes/app-backgrounds';
import { insertBackgroundCSSClass } from '../utilities/background-helper';

export const ThemeContext = createContext({
  isDarkMode: false,
  setIsDarkMode: () => {},
  theme: themes.default.dark,
  setTheme: () => {},
  appBackground: backgrounds[themes.default.dark.backgroundClass],
  setAppBackground: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [theme, setTheme] = useState(themes.default.dark);
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
  };

  const applyTheme = (theme, background) => {
    Object.keys(theme).forEach((key) => {
      if (key !== 'backgroundClass') {
        document.documentElement.style.setProperty(`--${key}`, theme[key]);
      }
    });
    document.body.className = `${theme.mode} ${theme.backgroundClass}`;
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

    // Apply the CSS class to the body
    document.body.className = `${theme.name}-${theme.mode} ${newBackground.className}`;
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
