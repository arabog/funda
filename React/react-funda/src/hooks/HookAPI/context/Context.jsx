import { useContext } from "react";
import {ThemeContext} from './Theme'

// https://dev.to/nas5w/toggling-light-dark-theme-in-react-with-usecontext-39hn

function ThemedButton() {
          let { theme, toggleTheme} = useContext(ThemeContext);
                    

          return (
                    <div>
                              <button 
                                        style={{ background: theme.background, color: theme.foreground }}

                                        onClick={toggleTheme}
                              >
                                        I am styled by theme context!
                              </button>
                    </div>
          );
}


export default ThemedButton