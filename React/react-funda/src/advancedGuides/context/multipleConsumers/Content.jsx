import React from 'react'
import ProfilePage from './ProfilePage'
import { ThemeContext } from './ThemeContext'
import { UserContext } from './UserContext'


const Content = () => {
/* A context consumer must be rendered with a fxn
return (
          <ThemeContext.Consumer>
                    {
                              theme => (
                                        <UserContext.Consumer>
                                                  {
                                                            user => (<ProfilePage theme={theme} user={user.name} />)
                                                  }
                                        </UserContext.Consumer>
                              )
                    }
          </ThemeContext.Consumer>
)
*/


          return (
                    <ThemeContext.Consumer>
                              {
                                        theme => (
                                                  <UserContext.Consumer>
                                                            {
                                                                      user => (
                                                                                <ProfilePage 
                                                                                          theme={theme} 
                                                                                          user={user.name} 
                                                                                />
                                                                      )
                                                            }
                                                  </UserContext.Consumer>
                                        )
                              }
                    </ThemeContext.Consumer>
          )
}


export default Content

