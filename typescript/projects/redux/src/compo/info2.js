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










https://redux.js.org/tutorials/fundamentals/part-6-async-logic

https://redux.js.org/tutorials/fundamentals/part-7-standard-patterns

https://redux.js.org/tutorials/fundamentals/part-8-modern-redux

https://nfgrn.csb.app/
*/
