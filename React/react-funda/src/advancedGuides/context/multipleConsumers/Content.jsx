import React from 'react'
import ProfilePage from './ProfilePage'
import { ThemeContext } from './ThemeContext'
import { UserContext } from './UserContext'


const Content = () => {


          return (
                    <ThemeContext.Consumer>
                              {
                                        theme => (
                                                  <UserContext.Consumer>
                                                            {
                                                                      user => (
                                                                                <ProfilePage user={user.name} theme={theme} />
                                                                      )
                                                            }
                                                  </UserContext.Consumer>
                                        )
                              }
                    </ThemeContext.Consumer>
          )
}

export default Content