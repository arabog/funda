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


*/




