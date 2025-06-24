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
  orange: {
    name: "orange",
    label: "Accops Orange",
    primary: "251 146 60", // orange-400
    primaryDark: "249 115 22", // orange-500
    primaryLight: "253 186 116", // orange-300
    accent: "255 237 213", // orange-100
    gradient: "from-orange-400 to-orange-500",
    description: "Brand signature color",
  },
  red: {
    name: "red",
    label: "Dynamic Red",
    primary: "239 68 68", // red-500
    primaryDark: "220 38 38", // red-600
    primaryLight: "252 165 165", // red-300
    accent: "254 226 226", // red-100
    gradient: "from-red-500 to-red-600",
    description: "Bold and energetic",
  },
  amber: {
    name: "amber",
    label: "Golden Amber",
    primary: "245 158 11", // amber-500
    primaryDark: "217 119 6", // amber-600
    primaryLight: "252 211 77", // amber-300
    accent: "255 251 235", // amber-50
    gradient: "from-amber-500 to-amber-600",
    description: "Warm and inviting",
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
  pearl: {
    name: "pearl",
    label: "Enterprise Pearl",
    primary: "148 163 184", // slate-400 - lighter
    primaryDark: "100 116 139", // slate-500
    primaryLight: "203 213 225", // slate-300
    accent: "248 250 252", // slate-50 - almost white
    gradient: "from-slate-400 to-slate-500",
    description: "Clean and minimal",
  },
  whitesmoke: {
    name: "whitesmoke",
    label: "White Smoke",
    primary: "156 163 175", // gray-400
    primaryDark: "107 114 128", // gray-500
    primaryLight: "209 213 219", // gray-300
    accent: "249 250 251", // gray-50 - white smoke
    gradient: "from-gray-400 to-gray-500",
    description: "Ultra light and airy",
  },
  platinum: {
    name: "platinum",
    label: "Platinum Grey",
    primary: "222 223 226", // #dedfe2
    primaryDark: "190 191 194", // darker version
    primaryLight: "240 240 242", // lighter version
    accent: "248 249 250", // very light
    gradient: "from-gray-300 to-gray-400",
    description: "Professional platinum",
  },
  cyan: {
    name: "cyan",
    label: "Electric Cyan",
    primary: "8 145 178", // cyan-600
    primaryDark: "14 116 144", // cyan-700
    primaryLight: "103 232 249", // cyan-300
    accent: "207 250 254", // cyan-100
    gradient: "from-cyan-600 to-cyan-700",
    description: "Fresh and modern",
  },
  lime: {
    name: "lime",
    label: "Vibrant Lime",
    primary: "132 204 22", // lime-500
    primaryDark: "101 163 13", // lime-600
    primaryLight: "190 242 100", // lime-300
    accent: "236 252 203", // lime-100
    gradient: "from-lime-500 to-lime-600",
    description: "Fresh and energetic",
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

    if (!currentTheme) return;

    // Use a more reliable approach for theme changes
    const applyTheme = () => {
      try {
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

        // Store in localStorage immediately
        localStorage.setItem("accops-theme", theme);
      } catch (error) {
        console.warn("Theme update failed:", error);
      }
    };

    // Apply theme immediately if document is ready, otherwise wait
    if (document.readyState === "complete") {
      applyTheme();
    } else {
      requestAnimationFrame(applyTheme);
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

// Add a utility to safely get theme without throwing
export function useThemeSafe() {
  try {
    return useTheme();
  } catch {
    return {
      theme: "blue",
      setTheme: () => {},
      currentTheme: themes.blue,
    };
  }
}
