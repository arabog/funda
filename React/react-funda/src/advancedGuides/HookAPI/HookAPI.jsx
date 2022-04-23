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


*/