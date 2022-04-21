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




*/

import React, { useState } from 'react'

const Mouse = () => {
          const [xAxis, setXAxis] = useState(0)
          const [yAxis, setYAxis] = useState(0)

          const handleMouseMove = (e) => {
                    setXAxis(e.clientX)

                    setYAxis(e.clientY)
          }

          return (
                    <div style={{height: '100vh'}} onMouseMove={handleMouseMove}>
                              {/* ...but how do we render something other than a <p>? */}
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

export default MouseTracker