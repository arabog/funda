import React from 'react'

const ErrorHandler =({error}) => {
          return (
                    <div role='alert'>
                              <p>An error occurred:</p>

                              <pre> {error.message} </pre>          
                    </div>
          )
}


const City = ({name}) => {
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


const Country = ({capital}) => {
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


const TryAndCatch = () => {


          return (
                    <div>
                              <Country />
                              <City />          
                    </div>
          )
}


export default TryAndCatch