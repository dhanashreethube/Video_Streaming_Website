import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useStreamForge } from '../context/StreamForgeContext';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useStreamForge();

  return (
    <button
      onClick={toggleTheme}
      className="theme-switch-btn"
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <>
          <Sun size={18} />
          <span>Light Mode</span>
        </>
      ) : (
        <>
          <Moon size={18} />
          <span>Dark Mode</span>
        </>
      )}
    </button>
  );
};

export default ThemeSwitcher;
