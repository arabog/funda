import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'


const ErrorHandler = ({error}) => {


          return (
                    <div role='alert'>
                              <p>An error occurred:</p>

                              <pre> {error.message} </pre>          
                    </div>
          )
}


const City = ({name}) => {


          return (
                    <div>
                              Hello, visit {name.toUpperCase()}
                    </div>
          )
}


const Country = ({capital}) => {


          return (
                    <div>
                              Hello, visit {capital.toUpperCase()}
                    </div>
          )
}

const ReactErrorBoundry = () => {


          return (
                    <ErrorBoundary FallbackComponent={ErrorHandler}>
                              <Country />

                              <City />
                    </ErrorBoundary>
          )
}


export default ReactErrorBoundry