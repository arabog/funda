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



*/
