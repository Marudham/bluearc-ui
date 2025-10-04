import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [themeTitle, setThemeTitle] = useState('Switch to Light Mode');

  useEffect(() => {
    const savedTheme = localStorage.getItem('bluearc-theme');
    if (savedTheme) {
      const isDark = savedTheme === 'dark';
      setIsDarkTheme(isDark);
      setThemeTitle(isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme(prev => {
      const newTheme = !prev;
      setThemeTitle(newTheme ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      localStorage.setItem('bluearc-theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  };

  const value = {
    isDarkTheme,
    toggleTheme,
    themeTitle,
  };

  return (
    <ThemeContext.Provider value={value}>
      <div className={isDarkTheme ? 'dark-theme' : 'light-theme'}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};