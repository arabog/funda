import { useReducer } from "react";

import {Reducer, InitialState} from "./Reducer";

function Counter() {
          const [state, dispatch] = useReducer(Reducer, InitialState);

          
          return (
                    <>
                              Count: {state.count}
                    
                              <button onClick={() => dispatch({type: 'decrement'})}>-</button>
                              <button onClick={() => dispatch({type: 'increment'})}>+</button>
                    </>
          );
}


export default Counter;