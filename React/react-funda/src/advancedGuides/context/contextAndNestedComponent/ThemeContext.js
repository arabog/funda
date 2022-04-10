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

/*
Updating Context from a Nested Component
It is often necessary to update the context from a component 
that is nested somewhere deeply in the component tree. In 
this case you can pass a function down through the context 
to allow consumers to update the context:
*/

export const ThemeContext = createContext({
          theme: themes.dark,

          toggleTheme: () => {}
});


