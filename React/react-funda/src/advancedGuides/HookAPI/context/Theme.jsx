import { createContext, useState } from "react";


const themes = {
          light: {
                    foreground: "#000000",
                    background: "#eeeeee"
          },
          
          dark: {
                    foreground: "#ffffff",
                    background: "#222222"
          }
};


const ThemeContext = createContext({})


const ThemeProvider = ({children}) => {
          const [theme, setTheme] = useState(themes.dark)

          const toggleTheme = () => {
                    setTheme(theme === themes.dark ? themes.light : themes.dark )
          }

          
          return (
                    <ThemeContext.Provider value = {{theme, toggleTheme }}>
                              {children}
                    </ThemeContext.Provider>
          )
} 

export {ThemeContext, ThemeProvider}

