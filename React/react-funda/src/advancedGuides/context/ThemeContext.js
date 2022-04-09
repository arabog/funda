import { createContext } from 'react'

export const themes = {
          light: {
                    foreground: 'white',
                    background: 'blue',
          },

          dark: {
                    foreground: 'red',
                    background: 'green',
          },
};

export const ThemeContext = createContext(
          // default value
          themes.dark
);
