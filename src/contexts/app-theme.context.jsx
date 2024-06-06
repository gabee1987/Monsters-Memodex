import React, { createContext, useContext, useState, useEffect } from 'react';

import { themes } from '../app-themes/app-themes';

export const APP_BACKGROUND_TYPES = {
  BG_DEFAULT_DARK: 'bg-default-dark',
  BG_DEFAULT_LIGHT: 'bg-default-light',
  BG_SOLID_LIGHT: 'bg-solid-light',
  BG_SOLID_DARK: 'bg-solid-dark',
  BG_JAPANESE: 'bg-pattern-japanese',
  BG_JAPANESE_2: 'bg-pattern-japanese-2',
  BG_HEXAGON: 'bg-pattern-hexagon',
  BG_GEOMETRIC_4: 'bg-pattern-geometric-4',
  // TODO More backgrounds will come here...
};

export const ThemeContext = createContext({
  theme: themes.default.dark,
  setTheme: () => {},
  appBackground: APP_BACKGROUND_TYPES.BG_DEFAULT_DARK,
  setAppBackground: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.default.dark);
  const [appBackground, setAppBackground] = useState(
    APP_BACKGROUND_TYPES.BG_DEFAULT_DARK
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    applyBackground(appBackground);
  }, [appBackground]);

  const toggleTheme = (themeName, mode) => {
    const newTheme = themes[themeName][mode];
    console.log('Theme selected in context: ', newTheme);
    setTheme(newTheme);
  };

  const applyTheme = (theme, background) => {
    Object.keys(theme).forEach((key) => {
      document.documentElement.style.setProperty(`--${key}`, theme[key]);
    });
    document.body.className = `${theme.mode} ${background}`;
    // document.body.style.backgroundImage = theme.backgroundImage;
    console.log('bg applied from context: ', theme.backgroundImage);
  };

  const applyBackground = (background) => {
    document.body.className = background;
    // document.body.style.backgroundImage = theme.backgroundImage;
  };

  const value = {
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
