// /*
https://dev.to/edemagbenyo/handle-errors-in-react-components-like-a-pro-l7l4\


Introducing Error Boundaries
A JavaScript error in a part of the UI shouldn’t break the whole app. 
To solve this problem for React users, React 16 introduces a new 
concept of an “error boundary”.

Error boundaries are React components that catch JavaScript errors 
anywhere in their child component tree, log those errors, and display 
a fallback UI instead of the component tree that crashed. Error boundaries 
catch errors during rendering, in lifecycle methods, and in constructors of 
the whole tree below them.

Note

Error boundaries do not catch errors for:
Event handlers
Asynchronous code (e.g. setTimeout or requestAnimationFrame callbacks)
Server side rendering
Errors thrown in the error boundary itself (rather than its children)

In practice, most of the time you’ll want to declare an error boundary 
component once and use it throughout your application.

Note that error boundaries only catch errors in the components 
below them in the tree. An error boundary can’t catch an error 
within itself. If an error boundary fails trying to render the error 
message, the error will propagate to the closest error boundary above 
it. This, too, is similar to how the catch {} block works in JavaScript.


