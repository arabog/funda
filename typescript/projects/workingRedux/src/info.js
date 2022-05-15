/*
-: Action Creators
In our app, we've been writing action objects directly in the code, 
where they're being dispatched:

dispatch({ type: 'todos/todoAdded', payload: trimmedText })

An action creator is a function that creates and returns an action 
object. We typically use these so we don't have to write the action 
object by hand every time:

const todoAdded = text = {
          return {
                    type: 'todos/todoAdded',
                    payload: text,
          }
}

We then use them by calling the action creator, and then passing 
the resulting action object directly to dispatch:

store.dispatch(todoAdded('Buy Milk'));

console.log(store.getState().todos)



-: Memoized Selectors
We've already seen that we can write "selector" functions, which 
accept the Redux state object as an argument, and return a value:

const selectedTodos = state => state.todos;

What if we need to derive some data? For example, maybe we 
want to have an array of only the todo IDs:

const selectedTodoIds = state => state.todos.map(todo => todo.id)

However, array.map() always returns a new array reference. We know 
that the React-Redux useSelector hook will re-run its selector function 
after every dispatched action, and if the selector result changes, it will 
force the component to re-render.

In this example, calling useSelector(selectTodoIds) will always cause 
the component to re-render after every action, because it's returning 
a new array reference!

In Part 5, we saw that we can pass shallowEqual as an argument to 
useSelector. There's another option here, though: we could use 
"memoized" selectors.

Memoization is a kind of caching - specifically, saving the results of 
an expensive calculation, and reusing those results if we see the 
same inputs later.

Memoized selector functions are selectors that save the most recent 
result value, and if you call them multiple times with the same inputs, 
will return the same result value. If you call them with different inputs 
than last time, they will recalculate a new result value, cache it, and 
return the new result.

-: Memoizing Selectors with createSelector
The Reselect library provides a createSelector API that will generate 
memoized selector functions. createSelector accepts one or more 
"input selector" functions as arguments, plus an "output selector", 
and returns the new selector function. Every time you call the 
selector

npm install reselect

Our original selectTodoIds function was defined over in TodoList.js, 
but it's more common for selector functions to be written in the 
relevant slice file. So, let's add this to the todos slice:

-: Selectors with Multiple Arguments
Our todo app is supposed to have the ability to filter the visible todos 
based on their completed status. Let's write a memoized selector that 
returns that filtered list of todos.

We know we need the entire todos array as one argument to our output 
selector. We also need to pass in the current completion status filter 
value as well. We'll add a separate "input selector" to extract each 
value, and pass the results to the "output selector".

CAUTION
Note that we've now added an import dependency between two slices - 
the todosSlice is importing a value from the filtersSlice. This is legal, 
but be careful. If two slices both try to import something from each 
other, you can end up with a "cyclic import dependency" problem 
that can cause your code to crash. If that happens, try moving some 
common code to its own file and import from that file instead.

-: Async Request Status


-: Part 8: Modern Redux with Redux Toolkit
TIP
Redux Toolkit only covers the Redux logic - we still use React-Redux 
to let our React components talk to the Redux store, including 
useSelector and useDispatch.

Using createSlice
createSlice takes an object with three main options fields:

name: a string that will be used as the prefix for generated action types
initialState: the initial state of the reducer
reducers: an object where the keys are strings, and the values are "case reducer" functions that will handle specific actions
Let's look at a small standalone example first.

import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded(state, action) {
      // ✅ This "mutating" code is okay inside of createSlice!
      state.push(action.payload)
    },
    todoToggled(state, action) {
      const todo = state.find(todo => todo.id === action.payload)
      todo.completed = !todo.completed
    },
    todosLoading(state, action) {
      return {
        ...state,
        status: 'loading'
      }
    }
  }
})

export const { todoAdded, todoToggled, todosLoading } = todosSlice.actions

export default todosSlice.reducer

Redux Toolkit (RTK) is the standard way to write Redux logic

createSlice simplifies writing Redux actions and reducers
Automatically generates action creators based on slice/reducer names
Reducers can "mutate" state inside createSlice using Immer

createAsyncThunk generates thunks for async calls

https://github.com/florinpop17/app-ideas



https://redux.js.org/tutorials/fundamentals/part-7-standard-patterns

https://redux.js.org/tutorials/fundamentals/part-8-modern-redux

https://codesandbox.io/s/github/reduxjs/redux-fundamentals-example-app/tree/checkpoint-10-finalCode/?from-embed


http://bookszlibb74ugqojhzhg2a63w5i2atv5bqarulgczawnbmsb6s6qead.onion
*/
