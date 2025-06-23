import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = {
  name: string;
  label: string;
  primary: string;
  primaryDark: string;
  primaryLight: string;
  accent: string;
  gradient: string;
  description: string;
};

export const themes: Record<string, Theme> = {
  blue: {
    name: "blue",
    label: "Ocean Blue",
    primary: "59 130 246", // blue-500
    primaryDark: "37 99 235", // blue-600
    primaryLight: "147 197 253", // blue-300
    accent: "219 234 254", // blue-100
    gradient: "from-blue-500 to-blue-600",
    description: "Professional and trustworthy",
  },
  indigo: {
    name: "indigo",
    label: "Deep Indigo",
    primary: "99 102 241", // indigo-500
    primaryDark: "79 70 229", // indigo-600
    primaryLight: "165 180 252", // indigo-300
    accent: "224 231 255", // indigo-100
    gradient: "from-indigo-500 to-indigo-600",
    description: "Modern and sophisticated",
  },
  purple: {
    name: "purple",
    label: "Royal Purple",
    primary: "147 51 234", // purple-500
    primaryDark: "126 34 206", // purple-600
    primaryLight: "196 181 253", // purple-300
    accent: "243 232 255", // purple-100
    gradient: "from-purple-500 to-purple-600",
    description: "Creative and innovative",
  },
  emerald: {
    name: "emerald",
    label: "Emerald Green",
    primary: "16 185 129", // emerald-500
    primaryDark: "5 150 105", // emerald-600
    primaryLight: "110 231 183", // emerald-300
    accent: "209 250 229", // emerald-100
    gradient: "from-emerald-500 to-emerald-600",
    description: "Growth and sustainability",
  },
  orange: {
    name: "orange",
    label: "Vibrant Orange",
    primary: "249 115 22", // orange-500
    primaryDark: "234 88 12", // orange-600
    primaryLight: "253 186 116", // orange-300
    accent: "255 237 213", // orange-100
    gradient: "from-orange-500 to-orange-600",
    description: "Energetic and dynamic",
  },
  teal: {
    name: "teal",
    label: "Corporate Teal",
    primary: "20 184 166", // teal-500
    primaryDark: "13 148 136", // teal-600
    primaryLight: "94 234 212", // teal-300
    accent: "204 251 241", // teal-100
    gradient: "from-teal-500 to-teal-600",
    description: "Balanced and reliable",
  },
  rose: {
    name: "rose",
    label: "Elegant Rose",
    primary: "244 63 94", // rose-500
    primaryDark: "225 29 72", // rose-600
    primaryLight: "253 164 175", // rose-300
    accent: "255 228 230", // rose-100
    gradient: "from-rose-500 to-rose-600",
    description: "Warm and approachable",
  },
  slate: {
    name: "slate",
    label: "Executive Slate",
    primary: "100 116 139", // slate-500
    primaryDark: "71 85 105", // slate-600
    primaryLight: "148 163 184", // slate-300
    accent: "241 245 249", // slate-100
    gradient: "from-slate-500 to-slate-600",
    description: "Professional and neutral",
  },
};

type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
  currentTheme: Theme;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("accops-theme") || "blue";
    }
    return "blue";
  });

  useEffect(() => {
    const root = document.documentElement;
    const currentTheme = themes[theme];

    if (currentTheme) {
      // Batch DOM updates to prevent layout thrashing
      requestAnimationFrame(() => {
        // Update CSS variables in a single batch
        const updates = [
          ["--primary", currentTheme.primary],
          ["--primary-dark", currentTheme.primaryDark],
          ["--primary-light", currentTheme.primaryLight],
          ["--accent", currentTheme.accent],
          ["--theme-gradient", currentTheme.gradient],
          ["--accops-blue", currentTheme.primary],
          ["--accops-blue-dark", currentTheme.primaryDark],
        ];

        // Apply all updates at once
        updates.forEach(([property, value]) => {
          root.style.setProperty(property, value);
        });

        // Add CSS class for additional optimizations
        root.setAttribute("data-theme", theme);
      });

      // Store in localStorage (non-blocking)
      setTimeout(() => {
        localStorage.setItem("accops-theme", theme);
      }, 0);
    }
  }, [theme]);

  const value = {
    theme,
    setTheme,
    currentTheme: themes[theme],
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
