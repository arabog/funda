/*
Render Props
The term “render prop” refers to a technique for sharing code 
between React components using a prop whose value is a function.

A component with a render prop takes a function that returns 
a React element and calls it instead of implementing its own 
render logic.

<DataProvider 
          render = {
                    data => (
                              <h1>Hello {data.target}</h1>
                    )
          }
/>

Libraries that use render props include React Router, 
Downshift and Formik.

In this document, we’ll discuss why render props are useful, 
and how to write your own.


-: Use Render Props for Cross-Cutting Concerns
Components are the primary unit of code reuse in React, but 
it’s not always obvious how to share the state or behavior 
that one component encapsulates to other components that 
need that same state.

For example, the following component tracks the mouse 
position in a web app:

import React, { useState } from 'react'

const MouseTracker = () => {
          const [xAxis, setXAxis] = useState(0)
          const [yAxis, setYAxis] = useState(0)

          const handleMouseMove = (e) => {
                    setXAxis(e.clientX)

                    setYAxis(e.clientY)
          }

          return (
                    <div style={{height: '100vh'}} onMouseMove={handleMouseMove}>
                              <h1>Move the mouse around!</h1>

                              <p>The current mouse position is ({xAxis}, {yAxis})</p>
                    </div>
          )
}


export default MouseTracker

As the cursor moves around the screen, the component displays 
its (x, y) coordinates in a <p>.

Now the question is: How can we reuse this behavior in another 
component? In other words, if another component needs to know 
about the cursor position, can we encapsulate that behavior so 
that we can easily share it with that component?

Since components are the basic unit of code reuse in React, 
let’s try refactoring the code a bit to use a <Mouse> 
component that encapsulates the behavior we need to reuse 
elsewhere.

const Mouse = () => {
          const [xAxis, setXAxis] = useState(0)
          const [yAxis, setYAxis] = useState(0)

          const handleMouseMove = (e) => {
                    setXAxis(e.clientX)

                    setYAxis(e.clientY)
          }

          return (
                    <div style={{height: '100vh'}} onMouseMove={handleMouseMove}>
                              ...but how do we render something other than a <p>? 
                              <p>The current mouse position is ({xAxis}, {yAxis})</p>
                    </div>
          )
}

const MouseTracker = () => {

          
          return (
                    <>
                              <h1>Move the mouse around!</h1>

                              <Mouse />
                    </>
          )
}

Now the <Mouse> component encapsulates all behavior 
associated with listening for mousemove events and storing 
the (x, y) position of the cursor, but it’s not yet truly reusable.

For example, let’s say we have a <Cat> component that renders 
the image of a cat chasing the mouse around the screen. We 
might use a <Cat mouse={{ x, y }}> prop to tell the component 
the coordinates of the mouse so it knows where to position the 
image on the screen.

As a first pass, you might try rendering the <Cat> inside 
<Mouse>’s render method, like this:

import React, { useState } from 'react'

const Cat = (props) => {
          const { axisX, axisY } = props;


          return (
                    <div>
                              <img 
                                        alt=''
                                        src="data:image/jpeg;base64,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" 
                                        style={{ 
                                                  position: 'absolute', 
                                                  left: axisX, 
                                                  top: axisY 
                                        }} 
                              />
                    </div>
          )
}

const Mouse = () => {
          const [xAxis, setXAxis] = useState(0)
          const [yAxis, setYAxis] = useState(0)

          const handleMouseMove = (e) => {
                    setXAxis(e.clientX)

                    setYAxis(e.clientY)
          }

          let props = {
                    axisX: xAxis,
                    axisY: yAxis
          }

          return (
                    <div style={{height: '100vh'}} onMouseMove={handleMouseMove}>
                              <p>The current mouse position is ({xAxis}, {yAxis})</p>
                              
                              <Cat {...props} />
                    </div>
          )
}


const MouseTracker = () => {


          return (
                    <>
                              <h1>Move the mouse around!</h1>

                              <Mouse />
                    </>
          )
}

export default MouseTracker

This approach will work for our specific use case, but we 
haven’t achieved the objective of truly encapsulating the 
behavior in a reusable way. Now, every time we want the 
mouse position for a different use case, we have to create 
a new component (i.e. essentially another <Mouse>) 
that renders something specifically for that use case.

Here’s where the render prop comes in: Instead of hard-coding 
a <Cat> inside a <Mouse> component, and effectively changing 
its rendered output, we can provide <Mouse> with a function 
prop that it uses to dynamically determine what to render–a 
render prop.

const Cat = (props) => {
          const { axisX, axisY } = props.mouse;


          return (
                    <div>
                              <img 
                                        alt=''
                                        src="data:image/jpeg;base64,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" 
                                        style={{ 
                                                  position: 'absolute', 
                                                  left: axisX, 
                                                  top: axisY 
                                        }} 
                              />
                    </div>
          )
}

const Mouse = (props) => {
          const [xAxis, setXAxis] = useState(0)
          const [yAxis, setYAxis] = useState(0)

          const handleMouseMove = (e) => {
                    setXAxis(e.clientX)

                    setYAxis(e.clientY)
          }

          let propsValues = {
                    axisX: xAxis,
                    axisY: yAxis
          }


          return (
                    <div style={{height: '100vh'}} onMouseMove={handleMouseMove}>
                              <p>The current mouse position is ({xAxis}, {yAxis})</p>
                              
                              {props.render({...propsValues})}
                    </div>
          )
}


const MouseTracker = () => {


          return (
                    <>
                              <h1>Move the mouse around!</h1>

                              <Mouse 
                                        render = {mouse => (
                                                  <Cat mouse={mouse} />
                                        )}
                              />
                    </>
          )
}

export default MouseTracker

Now, instead of effectively cloning the <Mouse> component and 
hard-coding something else in its render method to solve for a 
specific use case, we provide a render prop that <Mouse> can use 
to dynamically determine what it renders.

More concretely, a render prop is a function prop that a component 
uses to know what to render.

This technique makes the behavior that we need to share extremely 
portable. To get that behavior, render a <Mouse> with a render 
prop that tells it what to render with the current (x, y) of the cursor.

One interesting thing to note about render props is that you can 
implement most higher-order components (HOC) using a regular 
component with a render prop. For example, if you would prefer 
to have a withMouse HOC instead of a <Mouse> component, you 
could easily create one using a regular <Mouse> with a render prop:

// If you really want a HOC for some reason, you can easily
// create one using a regular component with a render prop!
function withMouse() {

          return function() {
          
                    return (
                              <Mouse render={mouse => (
                                        <Component {...props} mouse={mouse} />
                              )}/>
                    );
          
          }

}

So using a render prop makes it possible to use either pattern.





*/

import React, { useState } from 'react'

const Cat = (props) => {
          const { axisX, axisY } = props.mouse;


          return (
                    <div>
                              <img 
                                        alt=''
                                        src="data:image/jpeg;base64,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" 
                                        style={{ 
                                                  position: 'absolute', 
                                                  left: axisX, 
                                                  top: axisY 
                                        }} 
                              />
                    </div>
          )
}

const Mouse = (props) => {
          const [xAxis, setXAxis] = useState(0)
          const [yAxis, setYAxis] = useState(0)

          const handleMouseMove = (e) => {
                    setXAxis(e.clientX)

                    setYAxis(e.clientY)
          }

          let propsValues = {
                    axisX: xAxis,
                    axisY: yAxis
          }


          return (
                    <div style={{height: '100vh'}} onMouseMove={handleMouseMove}>
                              <p>The current mouse position is ({xAxis}, {yAxis})</p>
                              
                              {props.render({...propsValues})}
                    </div>
          )
}


// const MouseTracker = () => {


//           return (
//                     <>
//                               <h1>Move the mouse around!</h1>

//                               <Mouse 
//                                         render = {mouse => (
//                                                   <Cat mouse={mouse} />
//                                         )}
//                               />
//                     </>
//           )
// }

// HOC
function MouseTracker(props) {

          function LetCheck() {
          
                    return (
                              <>
                                        <h1>Move the mouse around!</h1>
                              
                                        <Mouse render={mouse => (
                                                            <Cat {...props} mouse={mouse} />
                                                  )}
                                        />
                              </>
                    );
          
          }

          return LetCheck()

}

export default MouseTracker

