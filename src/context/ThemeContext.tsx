import { createContext, useContext, type ReactNode } from 'react';

const ThemeContext = createContext<'dark'>('dark');

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeContext.Provider value="dark">
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
