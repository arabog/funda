/*
Part 5: UI and React
-: Basic Redux and UI Integration
Using Redux with any UI layer requires a few consistent steps:

1. Create a Redux store
2. Subscribe to updates
3. Inside the subscription callback:
          i. Get the current store state
          i. Extract the data needed by this piece of UI
          ii. Update the UI with the data
4. If necessary, render the UI with initial state
5. Respond to UI inputs by dispatching Redux actions

Let's go back to the the counter app example we saw 
in Part 1 and see how it follows those steps:

1) Create a new Redux store with the `createStore` function
const store = Redux.createStore(counterReducer)

2) Subscribe to redraw whenever the data changes in the future
store.subscribe(render)

Our "user interface" is some text in a single HTML element
const valueEl = document.getElementById('value')

3) When the subscription callback runs:
function render() {
          3.1) Get the current store state
          const state = store.getState()

          3.2) Extract the data you want
          const newValue = state.value.toString()

          3.3) Update the UI with the new value
          valueEl.innerHTML = newValue
}

4) Display the UI with the initial store state
render()

5) Dispatch actions based on UI inputs
document.getElementById('increment').addEventListener('click', function () {
          store.dispatch({ type: 'counter/incremented' })
})

No matter what UI layer you're using, Redux works this same way with every UI. 


-: Reading State from the Store with useSelector
The React-Redux hooks give your React component the ability to 
talk to the Redux store by reading state and dispatching actions.

useSelector hook lets your React components read data from the 
Redux store.

useSelector accepts a single function, which we call a selector 
function. A selector is a function that takes the entire Redux 
store state as its argument, reads some value from the state, 
and returns that result.

We can write a small selector function that returns that todos array:
const selectTodo = state => state.todos

Or, maybe we want to find out how many todos are currently 
marked as "completed":

const selectTotalCompletedTodos = state => {
          const completedTodos = state.todos.filter(todo => todo.completed);
          return completedTodos.length;
} 

We know that we can call store.subscribe() to listen for changes to the store

useSelector automatically subscribes to the Redux store for us! That way, 
any time an action is dispatched, it will call its selector function again 
right away. If the value returned by the selector changes from the last 
time it ran, useSelector will force our component to re-render with the new data.

const todos = useSelector(state => state.todos)

-: Dispatching Actions with useDispatch
We can call const dispatch = useDispatch() in any component that 
needs to dispatch actions, and then call dispatch(someAction) as 
needed.

Let's try that in our <Header> component. We know that we need to 
let the user type in some text for a new todo item, and then dispatch 
a {type: 'todos/todoAdded'} action containing that text.


-: Passing the Store with Provider
We have to specifically tell React-Redux what store we want to use 
in our components. We do this by rendering a <Provider> 
component around our entire <App>, and passing the Redux store 
as a prop to <Provider>. After we do this once, every component 
in the application will be able to access the Redux store if needs to.

The key parts of using React-Redux with React:
1. Call the useSelector hook to read data in React components
2. Call the useDispatch hook to dispatch actions in React components
3. Put <Provider store={store}> around your entire <App> component 
so that other components can talk to the store

Global state that is needed across the app should go in the Redux store. 
State that's only needed in one place should be kept in component state.

We can call useSelector multiple times within one component. In fact, 
this is actually a good idea - each call to useSelector should always 
return the smallest amount of state possible.

React-Redux has a shallowEqual comparison function we can use to 
check if the items inside the array are still the same



Todo: 
Try implementing the rest of the missing UI features on your own! 
Here's a list of the things you'll need to add:

In <TodoListItem> component, use the useDispatch hook to dispatch 
actions for changing the color category and deleting the todo
In <Footer>, use the useDispatch hook to dispatch actions for 
marking all todos as completed, clearing completed todos, and 
changing the filter values.


Part 6: Async Logic and Data Fetching

Redux Middleware and Side Effects
By itself, a Redux store doesn't know anything about async logic. 
It only knows how to synchronously dispatch actions, update the 
state by calling the root reducer function, and notify the UI that 
something has changed. Any asynchronicity has to happen 
outside the store.

Earlier, we said that Redux reducers must never contain "side
effects". A "side effect" is any change to state or behavior that 
can be seen outside of returning a value from a function.

Redux middleware were designed to enable writing logic that 
has side effects.'

Since middleware form a pipeline around the real store.dispatch 
function, this also means that we could actually pass something 
that isn't a plain action object to dispatch, as long as a middleware 
intercepts that value and doesn't let it reach the reducers.

Middleware also have access to dispatch and getState. That means 
you could write some async logic in a middleware, and still have 
the ability to interact with the Redux store by dispatching actions.

Using Middleware to Enable Async Logic
One possibility is writing a middleware that looks for specific action 
types, and runs async logic when it sees those actions, like these 
examples:

import {client} from '../api/client';


const delayedActionMiddleware = storeAPI => next => action => {
          if (action.type === 'todos/todoAdded') {
                    setTimeout(() => {
                               // Delay this action by one second
                              next(action)
                    }, 1000);

                    return
          }

          return next(action);
}

const fetchTodosMiddleware = storeAPI => next => action => {
          if (action.type === 'todos/fetchTodos') {
                    // Make an API call to fetch todos from the server
                    client.get('todos')
                              .then(todos => {
                                        //  Dispatch an action with the todos we received
                                        storeAPI.dispatch({
                                                  type: 'todos/todosLoaded', 
                                                  payload: todos;
                                        })
                              })
          }

          return next(action);
}

Writing an Async Function Middleware
What if we wrote a middleware that let us pass a function to 
dispatch, instead of an action object? We could have our 
middleware check to see if the "action" is actually a function 
instead, and if it's a function, call the function right away. 
That would let us write async logic in separate functions, 
outside of the middleware definition.

Here's what that middleware might look like:
import { client } from "./api/client";

const asyncFunctionMiddleware = storeAPI => next => action => {
          // If the "action" is actually a function instead...
          if (typeof action === 'function') {
                     // then call the function and pass `dispatch` and `getState` as arguments
                    return action(storeAPI.dispatch, storeAPI.getState)
          }

            // Otherwise, it's a normal action - send it onwards
          return next(action);
}

And then we could use that middleware like this:

const middlewareEnhancer = applyMiddleware(asyncFunctionMiddleware)
const store = createStore(rootReducer, middlewareEnhancer)

// Write a function that has `dispatch` and `getState` as arguments
const fetchSomeData = (dispatch, getState) => {
          // Make an async HTTP request
          client.get('todos')
                    .then(todos => {
                              // Dispatch an action with the todos we received
                              dispatch({
                                        type: 'todos/todosLoaded',
                                        payload: todos,
                              })

                              const allTodos  = getState().todos;

                              console.log('Number of todos after loading: ', allTodos.length);
                    })
}








https://redux.js.org/tutorials/fundamentals/part-7-standard-patterns

https://codesandbox.io/s/github/reduxjs/redux-fundamentals-example-app/tree/checkpoint-6-asyncThunks/?from-embed

https://redux.js.org/tutorials/fundamentals/part-8-modern-redux

https://codesandbox.io/s/github/reduxjs/redux-fundamentals-example-app/tree/checkpoint-8-normalizedState/?from-embed=&file=/src/features/todos/TodoList.js
https://nfgrn.csb.app/
*/

