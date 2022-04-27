import { createContext } from "react";

const themes = {
          dark: {
                    background: 'black',
                    color: 'white'
          },

          light: {
                    background: 'white',
                    color: 'black'
          }
}

const ThemeContext = createContext(
          {
                    theme: 'light',
                    toggleTheme: () => null,
          }
);

export {ThemeContext, themes};