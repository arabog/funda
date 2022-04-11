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


Where to Place Error Boundaries
The granularity of error boundaries is up to you. You may wrap 
top-level route components to display a “Something went wrong” 
message to the user, just like how server-side frameworks often 
handle crashes. You may also wrap individual widgets in an error 
boundary to protect them from crashing the rest of the application.

For example, Facebook Messenger wraps content of the sidebar, 
the info panel, the conversation log, and the message input into 
separate error boundaries. If some component in one of these UI 
areas crashes, the rest of them remain interactive.

We also encourage you to use JS error reporting services (or 
build your own) so that you can learn about unhandled exceptions 
as they happen in production, and fix them.


How About try/catch?
try / catch is great but it only works for imperative code:

try {
          showButton();
} catch (error) {
          // ...
}

However, React components are declarative and specify what 
should be rendered:
<Button />

Error boundaries preserve the declarative nature of React, 
and behave as you would expect. 








