import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

const ThemeContext = createContext({
  theme: "system", // "light" | "dark" | "system"
  setTheme: () => {},
});

export function ThemeProvider({ children, storageKey = "vite-ui-theme", defaultTheme = "system" }) {
  const [theme, setThemeState] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved || defaultTheme;
    } catch {
      return defaultTheme;
    }
  });

  // helper: apply class to <html>
  const applyThemeClass = useCallback((t) => {
    const root = document.documentElement;
    if (!root) return;

    if (t === "system") {
      // follow system preference
      const systemIsDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (systemIsDark) root.classList.add("dark");
      else root.classList.remove("dark");
    } else if (t === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  // update localStorage + state + apply class
  const setTheme = useCallback(
    (newTheme) => {
      try {
        localStorage.setItem(storageKey, newTheme);
      } catch {}
      setThemeState(newTheme);
      applyThemeClass(newTheme);
    },
    [applyThemeClass, storageKey]
  );

  // init + listen for system changes when theme === system
  useEffect(() => {
    applyThemeClass(theme);

    const mq = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
    if (!mq) return;

    function handleSystemChange(e) {
      // only react if user preference is 'system'
      if (theme === "system") {
        applyThemeClass("system");
      }
    }

    try {
      mq.addEventListener ? mq.addEventListener("change", handleSystemChange) : mq.addListener(handleSystemChange);
    } catch (e) {
      // older browsers
      mq.addListener(handleSystemChange);
    }

    return () => {
      try {
        mq.removeEventListener ? mq.removeEventListener("change", handleSystemChange) : mq.removeListener(handleSystemChange);
      } catch {}
    };
  }, [applyThemeClass, theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
