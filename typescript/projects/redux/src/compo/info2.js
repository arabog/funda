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












https://redux.js.org/tutorials/fundamentals/part-5-ui-react

https://redux.js.org/tutorials/fundamentals/part-6-async-logic


https://nfgrn.csb.app/
*/
