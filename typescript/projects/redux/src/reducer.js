import { combineReducers } from "redux"

import todosReducer from "./features/todos/todoSlice"
import filterReducer from "./features/filters/filterSlice"


// export default function rootReducer(state = {}, action) {
//             // always return a new object for the root state
//           return {
//                      // the value of `state.todos` is whatever the todos reducer returns
//                     todos: todosReducer(state.todos, action),

//                     // For both reducers, we only pass in their slice of the state
//                     filters: filterReducer(state.filters, action)
//           }
// }

const rootReducer = combineReducers(
          {
                    todos: todosReducer,

                    filters: filterReducer,
          }
)

export default rootReducer;