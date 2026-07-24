import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "nexus-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Only access localStorage in browser
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(storageKey) as Theme | null
      if (stored) {
        return stored
      }
      
      // Check OS preference
      if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        return "light"
      }
    }
    return defaultTheme
  })

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")
    root.classList.add(theme)
    
    // Fallback for custom CSS transitions if necessary
    root.style.setProperty("color-scheme", theme);
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
