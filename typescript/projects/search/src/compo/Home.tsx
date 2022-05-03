import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';

import  UserInfo from './UserInfo';


function randomUser() {
          let users = ["chaance", "jacob-ebey", "mcansh", "mjackson", "ryanflorence"];

          return users[Math.floor(Math.random() * users.length)];
}

const Home = () => {
          const [searchParams, setSearchParams] = useSearchParams ()
          let user = searchParams.get('user');

          const [userData, setUserData] = useState<any>(null);


          useEffect(() => {
                    const abortController = new AbortController();

                    async function getGitHubUser() {
                              const response = await fetch(`https://api.github.com/users/${user}`, {
                                        signal: abortController.signal,
                              });

                              if (!abortController.signal.aborted) {
                                        const data = await response.json()

                                        setUserData(data)
                              }
                    }

                    if (user) {
                              getGitHubUser()
                    }

                    return () => {
                              abortController.abort();
                    }
          }, [user])

          function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
                    event.preventDefault()

                    const formData = new FormData(event.currentTarget);
                    const newUser = formData.get('user') as string;

                    if (!newUser) return;

                    setSearchParams({user: newUser})
          }

          function handleRandomSubmit(event: React.FormEvent<HTMLFormElement>) {
                    event.preventDefault()

                    const newUser = randomUser()

                    if (newUser === user) {
                              handleRandomSubmit(event)
                    } else {
                              setSearchParams({user: newUser})
                    }
          }

          
          return (
                    <div>
                              {
                                        user ? (
                                                  <>
                                                            <h1>Search Params Example</h1>
                              
                                                            <p>
                                                                      This example demonstrates a simple search page that makes a request for
                                                                      user data to the GitHub API and displays information for that user on
                                                                      the page. The example uses the <code>useSearchParams()</code> hook to
                                                                      read and write the URL query string.
                                                            </p>
                              
                                                            <div style={{display: 'flex'}}>
                                                                      <form onSubmit={handleSubmit}>
                                                                                <label>
                                                                                          <input 
                                                                                                    defaultValue={user ?? undefined} 
                                                                                                    type='text' 
                                                                                                    name='user' 
                                                                                          />          
                                                                                </label>          
                              
                                                                                <button type='submit'>Search</button>
                                                                      </form>    
                              
                                                                      <form onSubmit={handleRandomSubmit}>
                                                                                <input type='hidden' name='random' />
                                                                                <button type='submit'>Random</button>          
                                                                      </form>      
                                                            </div>   
                              
                                                            <UserInfo data={userData} />
                                                  </>
                                        ) : (
                                                  <>
                                                            <h1>Search Params Example</h1>
                              
                                                            <p>
                                                                      This example demonstrates a simple search page that makes a request for
                                                                      user data to the GitHub API and displays information for that user on
                                                                      the page. The example uses the <code>useSearchParams()</code> hook to
                                                                      read and write the URL query string.
                                                            </p>

                                                            <div style={{display: 'flex'}}>
                                                                      <form onSubmit={handleSubmit}>
                                                                                <label>
                                                                                          <input 
                                                                                                    defaultValue={user ?? undefined} 
                                                                                                    type='text' 
                                                                                                    name='user' 
                                                                                          />          
                                                                                </label>          

                                                                                <button type='submit'>Search</button>
                                                                      </form>    

                                                                      <form onSubmit={handleRandomSubmit}>
                                                                                <input type='hidden' name='random' />
                                                                                <button type='submit'>Random</button>          
                                                                      </form>      
                                                            </div>   

                                                  </>
                                        )

                              }

                    </div>
          )
}

export default Home