import React from "react";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle-btn"
      onClick={toggleTheme}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      aria-label={`Toggle ${theme} mode`}
    >
      {theme === "dark" ? (
        <Sun className="theme-icon" size={18} />
      ) : (
        <Moon className="theme-icon" size={18} />
      )}
    </button>
  );
};

export default ThemeToggle;
