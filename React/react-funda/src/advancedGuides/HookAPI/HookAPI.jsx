/*
Hooks API Reference
Hooks are a new addition in React 16.8. They let you use state and other 
React features without writing a class.

Basic Hooks
useState
const [state, setState] = useState(initialState);
Returns a stateful value, and a function to update it.

During the initial render, the returned state (state) is the same as the value 
passed as the first argument (initialState).

The setState function is used to update the state. It accepts a new state value 
and enqueues a re-render of the component.

setState(newState);

During subsequent re-renders, the first value returned by useState will 
always be the most recent state after applying updates.

Functional updates
If the new state is computed using the previous state, you can pass a 
function to setState. The function will receive the previous value, and 
return an updated value. Here’s an example of a counter component 
that uses both forms of setState:


function Counter({initialCount}) {
          const [count, setCount] = useState(initialCount);
          
          return (
                    <>
                              Count: {count}

                              <button onClick={() => setCount(initialCount)}>Reset</button>

                              <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>

                              <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
                    </>
          );
}

The ”+” and ”-” buttons use the functional form, because the 
updated value is based on the previous value. But the “Reset” 
button uses the normal form, because it always sets the count 
back to the initial value.

If your update function returns the exact same value as the current 
state, the subsequent rerender will be skipped completely.

Note
Unlike the setState method found in class components, useState 
does not automatically merge update objects. You can replicate 
this behavior by combining the function updater form with 
object spread syntax:

const [state, setState] = useState({});

setState(prevState => {
          // Object.assign would also work
          return {...prevState, ...updatedValues};
});

Another option is useReducer, which is more suited for managing 
state objects that contain multiple sub-values.

Lazy initial state
The initialState argument is the state used during the initial render. 
In subsequent renders, it is disregarded. If the initial state is the 
result of an expensive computation, you may provide a function 
instead, which will be executed only on the initial render:

const [state, setState] = useState(() => {
          const initialState = someExpensiveComputation(props);
          
          return initialState;
});






*/