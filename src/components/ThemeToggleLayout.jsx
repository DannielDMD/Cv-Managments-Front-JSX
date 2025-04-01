import React, { useEffect, useState } from "react";

const ThemeToggleLayout = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="flex justify-end p-4">
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-md shadow bg-blue-600 dark:bg-yellow-500 text-white dark:text-black hover:opacity-80"
        >
          {isDarkMode ? "Modo Claro ☀️" : "Modo Oscuro 🌙"}
        </button>
      </header>

      <main className="p-6">
        {children}
      </main>
    </div>
  );
};

export default ThemeToggleLayout;