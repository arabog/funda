import { createContext } from 'react'


export const themes = {
          light: {
                    foreground: 'white',
                    background: 'black',
          },

          dark: {
                    foreground: 'black',
                    background: 'white',
          },
};


export const ThemeContext = createContext(
          // default value
          themes.dark
);
