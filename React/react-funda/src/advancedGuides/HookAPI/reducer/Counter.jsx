import { useReducer } from "react";

import {Reducer, InitialState} from "./Reducer";

function Counter() {
          const [state, dispatch] = useReducer(Reducer, InitialState);

          
          return (
                    <>
                              <div>Name: {state.user}</div>
                              <div>Count: {state.count}</div>
                    
                              <button onClick={() => dispatch({type: 'decrement', payload: {count: state.count - 7, user: 'Julius'}})}>-</button>
                              <button onClick={() => dispatch({type: 'increment'})}>+</button>
                    </>
          );
}



/*
import { useReducer } from "react";

import {Reducer, init} from "./Reducer";

function Counter({initialCount}) {
          const [state, dispatch] = useReducer(Reducer, initialCount = 0, init);
          
          return (
                    <>
                              Count: {state.count}
                              <button
                                        onClick={() => dispatch({type: 'reset', payload: initialCount})}
                              >
                                        Reset
                              </button>
                    
                              <button onClick={() => dispatch({type: 'decrement'})}>-</button>

                              <button 
                                        onClick={() => dispatch({
                                                  type: 'increment', 

                                                  payload: {count: state.count + 5}
                                        })}
                              >
                                        +
                              </button>
                    </>
          );
}

*/


export default Counter;