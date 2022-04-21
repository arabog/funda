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





*/