/*
https://dev.to/edemagbenyo/handle-errors-in-react-components-like-a-pro-l7l


Handle errors in React components like a pro
When you are writing a react application you have two 
ways to handling errors:

Using try/catch block in each component
Using React Error Boundary which is only available in 
class Component

import React from 'react'


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


const TryAndCatch = () => {


          return (
                    <div>
                              <Country />
                              <City />          
                    </div>
          )
}


export default TryAndCatch


Obviously, the error we created in the code above could have 
certainly been handled with PropTypes or TypeScript, however 
we are aware runtime error happens all the time and we are going 
to deal with it using the two approaches stated above.

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


const App = () => {


          return (
                    <div>
                              <Country />
                              <City />          
                    </div>
          )
}


export default App


This approach, requires us to define an ErrorHandler component to 
display in case an error occurs and we wrap each component returned 
element in the try/catch block.

This seems ok, but repetitive. What if we want the parent component 
to handle the error catching for us. Wrapping the parent component 
App in a try/catch block will not work, due to the nature of how React 
calls functions. That is when React Error Boundary comes in.


React Error Boundary
Error boundaries are React components that catch JavaScript errors 
anywhere in their child component tree, log those errors, and display 
a fallback UI instead of the component tree that crashed. Error 
boundaries catch errors during rendering, in lifecycle methods, and 
in constructors of the whole tree below them.

As at React 17.0.2, Error Boundary works only in

Class component
and It must implement static getDerivedStateFromError() or 
componentDidCatch(). In order to use Error Boundary in 
Functional Component, I use react-error-boundary.

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


When we run this application, we will get a nice error display form 
the content of ErrorHandler component. React error boundary catches 
any error from the components below them in the tree. This is really 
handy and useful because we need not declare a separate try/catch for 
each component because the wrapping component(ErrorBoundary) takes 
care of that and display the component of the FallbackComponent provided.


export function ErrorFallback({error, resetErrorBoundary}) {
          return (
                    <div role='alert'>
                              <p>Something went wrong: </p>
                              <pre>{error.message}</pre>

                              <button onClick={resetErrorBoundary} >
                                        Try Again
                              </button>
                    </div>
          )
}

export function Bomb() {
          throw new Error('💥 CABOOM 💥')
}


import React, { useState } from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {Bomb, ErrorFallback} from './advancedGuides/errorBoundaries/ErrorRecover/ErrorRecovery'



const App = () => {
	const [explode, setExplode] = useState(false);


	return (
		<div>
			<button onClick={() => setExplode(e => !e )}>Toggle Explode </button>

			<ErrorBoundary 
				FallbackComponent={ErrorFallback}
				onReset={() => setExplode(false)}
				resetKeys= {[explode]}
			>
				{ explode ? <Bomb /> : null }
			</ErrorBoundary>
		</div>
	)
}

export default App

The ErrorBoundary component accepts two other props to help recover 
from a state of error. The second prop onReset receives a function which 
will be triggered when resetErrorBoundary of the FallbackComponent is 
called. The onReset function is used to reset the state and perform any 
cleanup that will bring the component to a working state.

The other prop of ErrorBoundary is resetKeys, it accepts an array of 
elements that will be checked when an error has been caught. In case any 
of these elements changes, the ErrorBoundary will reset the state and 
re-render the component.

Handling error in React functional components should be a breeze for 
anyone using the react-error-boundary library. 

It provides the following features:
Fallback components to display incase of error
Granular capturing of error at component level
Recovery of error using a function or by resetting the elements 
causing the component to fail.

*/