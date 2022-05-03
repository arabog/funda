import React, { useEffect, useState } from 'react'
import { useSearchParams,  useNavigate } from 'react-router-dom';



function randomUser() {
          let users = ["chaance", "jacob-ebey", "mcansh", "mjackson", "ryanflorence"];

          return users[Math.floor(Math.random() * users.length)];
}

// https://stackblitz.com/github/remix-run/react-router/tree/main/examples/search-params?file=src%2FApp.tsx

const Home = () => {
          const navigate = useNavigate()
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

          const handleHome = () => {
                    navigate('/')
                    window.location.reload()
          }

          
          return (
                    <div>
                              {
                                        userData ? (
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
                              
                                                            <div
                                                                      style={{
                                                                                padding: "24px",
                                                                                margin: "24px 0",
                                                                                borderTop: "1px solid #eaeaea",
                                                                                display: "flex",
                                                                                flexDirection: 'column',
                                                                                alignItems: "center",
                                                                                gap: "16px",
                                                                      }}
                                                            >
                                                                      <img
                                                                                style={{ borderRadius: "50%" }}
                                                                                width={200}
                                                                                height={200}
                                                                                src={userData.avatar_url}
                                                                                alt={userData.login}
                                                                      />

                                                                      <div>
                                                                                <h2>{userData.name}</h2>
                                                                                <p>{userData.bio}</p>
                                                                      </div>

                                                                      <button onClick={() =>handleHome()}> Home </button>
                                                            </div>  
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