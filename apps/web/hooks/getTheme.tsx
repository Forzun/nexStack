import { useEffect, useState } from "react";

type ThemeItems = "dark" | "light" | null;

export function useGetTheme() {
  const [theme, setTheme] = useState<ThemeItems>(null);
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    const storage =
      typeof window !== "undefined" ? localStorage.getItem("theme") : null;

    if (storage === "light") {
      setTheme("light");
      setActive(true);
    } else if (storage === "dark") {
      setTheme("dark");
      setActive(false);
    }
  }, []);

  return {
    theme,
    active
  };
}