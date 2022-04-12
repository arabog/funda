/*
Forwarding Refs
Ref forwarding is a technique for automatically passing a ref 
through a component to one of its children. This is typically 
not necessary for most components in the application. However, 
it can be useful for some kinds of components, especially in 
reusable component libraries. The most common scenarios are 
described below.

Forwarding refs to DOM components
Consider a FancyButton component that renders the native button DOM element:

function FancyButton(props) {
          return (
                    <button className="FancyButton">
                              {props.children}
                    </button>
          );
}

React components hide their implementation details, including their 
rendered output. Other components using FancyButton usually will 
not need to obtain a ref to the inner button DOM element. This is good 
because it prevents components from relying on each other’s DOM 
structure too much.

Ref forwarding is an opt-in feature that lets some components take a ref 
they receive, and pass it further down (in other words, “forward” it) to 
a child.

In the example below, FancyButton uses React.forwardRef to obtain 
the ref passed to it, and then forward it to the DOM button that it renders:

const FancyButton = React.forwardRef((props, ref) => (
          <button ref={ref} className="FancyButton">
                    {props.children}
          </button>
));

// You can now get a ref directly to the DOM button:
const ref = React.createRef();

<FancyButton ref={ref}>
          Click me!
</FancyButton>;

This way, components using FancyButton can get a ref to the underlying 
button DOM node and access it if necessary—just like if they used a 
DOM button directly.

Here is a step-by-step explanation of what happens in the above example:

1. We create a React ref by calling React.createRef and assign it to 
a ref variable.
2. We pass our ref down to <FancyButton ref={ref}> by specifying it 
as a JSX attribute.
3. React passes the ref to the (props, ref) => ... function inside forwardRef 
as a second argument.
4. We forward this ref argument down to <button ref={ref}> by specifying 
it as a JSX attribute.
5. When the ref is attached, ref.current will point to the <button> DOM node.


Note
The second ref argument only exists when you define a component 
with React.forwardRef call. Regular function or class components 
don’t receive the ref argument, and ref is not available in props either.

Ref forwarding is not limited to DOM components. You can 
forward refs to class component instances, too.


Forwarding refs in higher-order components
This technique can also be particularly useful with higher-order 
components. Let’s start with an example HOC that logs component 
props to the console:


*/

import { useEffect } from "react/cjs/react.development"


function logProps(WrappedComponent) {
          const LogProps = (prevProps) => {
                    useEffect(() => {
                              console.log('old props: ', prevProps);
                              console.log('new props: ', props);
                    }, [])

                    return (
                              <div>
                                        <WrappedComponent {...props} />
                              </div>
                    )
          }

          return LogProps;

}


The “logProps” HOC passes all props through to the component it 
wraps, so the rendered output will be the same. For example, we 
can use this HOC to log all props that get passed to our “fancy 
button” component:

function FancyButton {
          focus() {
          // ...
          }

          // ...
}

// Rather than exporting FancyButton, we export LogProps.
// It will render a FancyButton though.
export default logProps(FancyButton);

There is one caveat to the above example: refs will not get passed 
through. That’s because ref is not a prop. Like key, it’s handled 
differently by React. If you add a ref to a HOC, the ref will refer 
to the outermost container component, not the wrapped component.

This means that refs intended for our FancyButton component will 
actually be attached to the LogProps component:

import FancyButton from './FancyButton';

const ref = React.createRef();

// The FancyButton component we imported is the LogProps HOC.
// Even though the rendered output will be the same,
// Our ref will point to LogProps instead of the inner FancyButton component!
// This means we can't call e.g. ref.current.focus()

<FancyButton
          label="Click Me"
          handleClick={handleClick}
          ref={ref}
/>;







