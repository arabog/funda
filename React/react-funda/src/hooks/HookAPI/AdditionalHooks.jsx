/*
Additional Hooks
The following Hooks are either variants of the basic ones from 
the previous section, or only needed for specific edge cases.

-:useReducer
const [state, dispatch] = useReducer(reducer, initialArg, init);

An alternative to useState. 
Accepts a reducer of type (state, action) => newState, and 
returns the current state paired with a dispatch method.

i.e: 
reducer has (state and action) while
useReducer has (stae and dispatch method)

useReducer is usually preferable to useState when you have complex 
state logic that involves multiple sub-values or when the next state 
depends on the previous one. useReducer also lets you optimize 
performance for components that trigger deep updates because 
you can pass dispatch down instead of callbacks.

Here’s the counter example from the useState section, 
rewritten to use a reducer:

const initialState = {count: 0};

function reducer(state, action) {
          switch (action.type) {
                    case 'increment':
                              return {count: state.count + 1};

                    case 'decrement':
                              return {count: state.count - 1};

                    default:
                              throw new Error();
          }
}

function Counter() {
          const [state, dispatch] = useReducer(reducer, initialState);

          return (
                    <>
                              Count: {state.count}
                    
                              <button onClick={() => dispatch({type: 'decrement'})}>-</button>
                              <button onClick={() => dispatch({type: 'increment'})}>+</button>
                    </>
          );
}


Specifying the initial state
There are two different ways to initialize useReducer state. You 
may choose either one depending on the use case. The simplest 
way is to pass the initial state as a second argument:

const [state, dispatch] = useReducer(
          reducer,
          {count: initialCount}
);

Lazy initialization
You can also create the initial state lazily. To do this, you can 
pass an init function as the third argument. The initial state 
will be set to init(initialArg).

It lets you extract the logic for calculating the initial state 
outside the reducer. This is also handy for resetting the state 
later in response to an action:

function init(initialCount) {
          return {count: initialCount};
}

function reducer(state, action) {
          switch (action.type) {
                    case 'increment':
                              return {count: state.count + 1};
                    
                    case 'decrement':
                              return {count: state.count - 1};
                    
                    case 'reset':
                              return init(action.payload);
                    
                    default:
                              throw new Error();
          }
}

function Counter({initialCount}) {
          const [state, dispatch] = useReducer(reducer, initialCount, init);

          return (
                    <>
                              Count: {state.count}

                              <button
                                        onClick={() => dispatch({type: 'reset', payload: initialCount})}
                              >
                                        Reset
                              </button>

                              <button onClick={() => dispatch({type: 'decrement'})}>-</button>
                              <button onClick={() => dispatch({type: 'increment'})}>+</button>
                    </>
          );
}


-: useCallback
const memoizedCallback = useCallback(() => {
                    doSomething(a, b);
          }, [a, b],
);

function ProductPage({ productId }) {
          // ✅ Wrap with useCallback to avoid change on every render
          const fetchProduct = useCallback(() => {
                    // ... Does something with productId ...
          }, [productId]); // ✅ All useCallback dependencies are specified

          return <ProductDetails fetchProduct={fetchProduct} />;
}

function ProductDetails({ fetchProduct }) {
          useEffect(() => {
                    fetchProduct();
          }, [fetchProduct]); // ✅ All useEffect dependencies are specified
          // ...
}

Returns a memoized callback.
Pass an inline callback and an array of dependencies. useCallback 
will return a memoized version of the callback that only changes if 
one of the dependencies has changed. This is useful when passing 
callbacks to optimized child components that rely on reference 
equality to prevent unnecessary renders

useCallback(fn, deps) is equivalent to useMemo(() => fn, deps).

Note
The array of dependencies is not passed as arguments to the callback. 
Conceptually, though, that’s what they represent: every value referenced 
inside the callback should also appear in the dependencies array. 


-: useMemo
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

Returns a memoized value.
Pass a “create” function and an array of dependencies. useMemo 
will only recompute the memoized value when one of the dependencies 
has changed. This optimization helps to avoid expensive calculations 
on every render.


Remember that the function passed to useMemo runs during rendering. 
Don’t do anything there that you wouldn’t normally do while rendering. 
For example, side effects belong in useEffect, not useMemo.

If no array is provided, a new value will be computed on every render.

You may rely on useMemo as a performance optimization, not as a 
semantic guarantee.

Conveniently, useMemo also lets you skip an expensive re-render of a child:

function Parent({ a, b }) {

          // Only re-rendered if `a` changes:
          const child1 = useMemo(() => <Child1 a={a} />, [a]);

          // Only re-rendered if `b` changes:
          const child2 = useMemo(() => <Child2 b={b} />, [b]);

          return (
                    <>
                              {child1}
                              {child2}
                    </>
          )
}

Note that this approach won’t work in a loop because Hook 
calls can’t be placed inside loops. But you can extract a 
separate component for the list item, and call useMemo there.



-: useRef
useRef is primarily a way to access the DOM. However, 
useRef() is useful for more than the ref attribute. It’s 
handy for keeping any mutable value around 

const refContainer = useRef(initialValue);

useRef returns a mutable ref object whose .current property 
is initialized to the passed argument (initialValue). The 
returned object will persist for the full lifetime of the 
component.

A common use case is to access a child imperatively:

function TextInputWithFocusButton() {
          const inputEl = useRef(null);

          const onButtonClick = () => {
                    // `current` points to the mounted text input element
                    inputEl.current.focus();
          };


          return (
                    <>
                              <input ref={inputEl} type="text" />
                              <button onClick={onButtonClick}>Focus the input</button>
                    </>
          );
}

Essentially, useRef is like a “box” that can hold a mutable 
value in its .current property.


-: useImperativeHandle
useImperativeHandle(ref, createHandle, [deps])

useImperativeHandle customizes the instance value that is 
exposed to parent components when using ref. As always, 
imperative code using refs should be avoided in most cases. 
useImperativeHandle should be used with forwardRef:

function FancyInput(props, ref) {
          const inputRef = useRef();

          useImperativeHandle(ref, () => ({ focus: () => { inputRef.current.focus() }   })  );

          return <input ref={inputRef} ... />;
}

FancyInput = forwardRef(FancyInput);

In this example, a parent component that renders 
<FancyInput ref={inputRef} /> would be able to call 
inputRef.current.focus().


-: useLayoutEffect
The signature is identical to useEffect, but it fires synchronously after 
all DOM mutations. Use this to read layout from the DOM and 
synchronously re-render. Updates scheduled inside useLayoutEffect 
will be flushed synchronously, before the browser has a chance to paint.

Prefer the standard useEffect when possible to avoid blocking visual updates.

Tip
If you’re migrating code from a class component, note useLayoutEffect 
fires in the same phase as componentDidMount and componentDidUpdate. 
However, we recommend starting with useEffect first and only trying 
useLayoutEffect if that causes a problem.

If you use server rendering, keep in mind that neither useLayoutEffect nor 
useEffect can run until the JavaScript is downloaded. This is why React 
warns when a server-rendered component contains useLayoutEffect. 
To fix this, either move that logic to useEffect (if it isn’t necessary for the 
first render), or delay showing that component until after the client renders 
(if the HTML looks broken until useLayoutEffect runs).

To exclude a component that needs layout effects from the server-rendered 
HTML, render it conditionally with showChild && <Child /> and defer 
showing it with useEffect(() => { setShowChild(true); }, []). This way, the 
UI doesn’t appear broken before hydration.


-: useDebugValue
useDebugValue(value)

useDebugValue can be used to display a label for custom 
hooks in React DevTools.

For example, consider the useFriendStatus custom Hook 
described in “Building Your Own Hooks”:

function useFriendStatus(friendID) {
          const [isOnline, setIsOnline] = useState(null);

          // ...

          // Show a label in DevTools next to this Hook
          // e.g. "FriendStatus: Online"
          useDebugValue(isOnline ? 'Online' : 'Offline');

          return isOnline;
}

Tip
We don’t recommend adding debug values to every custom 
Hook. It’s most valuable for custom Hooks that are part of 
shared libraries.

Defer formatting debug values
In some cases formatting a value for display might be an 
expensive operation. It’s also unnecessary unless a Hook 
is actually inspected.

For this reason useDebugValue accepts a formatting function 
as an optional second parameter. This function is only called 
if the Hooks are inspected. It receives the debug value as a 
parameter and should return a formatted display value.

For example a custom Hook that returned a Date value 
could avoid calling the toDateString function unnecessarily 
by passing the following formatter:

useDebugValue(date, date => date.toDateString());










// */
