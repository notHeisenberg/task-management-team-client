import { useState } from "react";

const ThemeChange = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.classList.toggle("dark-theme", newTheme === "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-blue-500 text-white text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300"
    >
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
};

export default ThemeChange;