import React from 'react'


function ErrorHandler({error}) {


          return (
                    <div role='alert'>
                              <p>An error occurred:</p>

                              <pre> {error.message} </pre>          
                    </div>
          )
}


function City({name}) {
          try {
                    return (
                              <div>
                                        Hello, visit {name.toUpperCase()}
                              </div>
                    )
                    
          } catch (err) {
                    return <ErrorHandler error={err} />
          }
}


function Country({capital}) {
          try {
                    return (
                              <div>
                                        Hello, visit {capital.toUpperCase()}
                              </div>
                    )
                    
          } catch (err) {
                    return <ErrorHandler error={err} />
          }
}


function TryAndCatch() {


          return (
                    <div>
                              <Country />

                              <City />          
                    </div>
          )
}


export default TryAndCatch
