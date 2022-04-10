import {ThemeContext} from './ThemeContext';


function ThemeTogglerButton() {
          // The Theme Toggler Button receives not only the theme
          // but also a toggleTheme function from the context.
          // And also useContext() Hook was nt required.


          return (
                    // A context consumer must be rendered with a fxn
                    <ThemeContext.Consumer>
                              {
                                        ({theme, toggleTheme}) => (
                                                  <button
                                                            onClick={toggleTheme}
                                                            style={{backgroundColor: theme.background, color: theme.foreground, cursor: 'pointer'}}
                                                  >
                                                            Toggle Theme
                                                  </button>
                                        )
                              }
                    </ThemeContext.Consumer>
          );
}


export default ThemeTogglerButton;