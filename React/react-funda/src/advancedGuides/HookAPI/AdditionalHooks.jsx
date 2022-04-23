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


// */
