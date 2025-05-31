import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

/**
 * Theme toggle component that switches between light and dark modes
 * @returns {JSX.Element} A button that toggles between light and dark themes
 */
function ToggleTheme() {
  // Initialize theme state with user preference or system preference
  const [theme, setTheme] = useState(() => {
    // Try to get theme from localStorage
    const savedTheme = localStorage.getItem("theme");
    // Return saved theme if exists, otherwise check system preference
    return (
      savedTheme ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
    );
  });

  // Apply theme changes to document and save to localStorage
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Persist theme preference
    localStorage.setItem("theme", theme);
  }, [theme]);

  /**
   * Toggles between light and dark themes
   */
  const toggleTheme = () => {
    // Fixed the toggle logic (was previously not changing)
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <Moon size={20} className="text-yellow-300" />
      ) : (
        <Sun size={20} className="text-orange-500" />
      )}
    </button>
  );
}

export default ToggleTheme;
