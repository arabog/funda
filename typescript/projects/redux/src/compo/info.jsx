/*
-: Part 1: Redux Overview

-: What is Redux?
Redux is a pattern and library for managing and updating application 
state, using events called "actions". It serves as a centralized store for 
state that needs to be used across your entire application,

-: Redux Libraries and Tools
Redux is a small standalone JS library. However, it is commonly used 
with several other packages:

React-Redux
React-Redux is our official package that lets your React components 
interact with a Redux store by reading pieces of state and dispatching 
actions to update the store

Redux Toolkit
Redux Toolkit is our recommended approach for writing Redux logic. 
It contains packages and functions that we think are essential for 
building a Redux app.

-: Redux Basics

The Redux Store
The center of every Redux application is the store. A "store" is a 
container that holds your application's global state.
A store is a JavaScript object with a few special functions and 
abilities that make it different than a plain global object:

the only way to cause an update to the state is to create a plain 
action object that describes "something that happened in the 
application", and then dispatch the action to the store to tell 
it what happened.

State, Actions, and Reducers
We start by defining an initial state value to describe the application:

// Define an initial state value for the app:
const initialState = {
          value: 0
}

The reducer receives two arguments, the current state and an action 
object describing what happened. When the Redux app starts up, we 
don't have any state yet, so we provide the initialState as the default 
value for this reducer:


// Create a "reducer" function that determines what the new state
// should be when something happens in the app

function counterReducer(state = initialState, action) {
          // Reducers usually look at the type of action that happened
          // to decide how to update the state

          switch (action.type) {
                    case 'counter/incremented':
                              return { ...state, value: state.value + 1 }

                    case 'counter/decremented':
                              return { ...state, value: state.value - 1 }
                              
                    default:
                              // If the reducer doesn't care about this action type,
                              // return the existing state unchanged
                              return state
          }
}

Action objects always have a type field, which is a string you provide 
that acts as a unique name for the action. The type should be a readable 
name so that anyone who looks at this code understands what it means. I

Note that we update the state immutably by copying the existing state and 
updating the copy, instead of modifying the original object directly.

-: Store
Now that we have a reducer function, we can create a store instance by 
calling the Redux library createStore API.

// Create a new Redux store with the `createStore` function,
// and use the `counterReducer` for the update logic

const store = Redux.createStore(counterReducer)

We pass the reducer function to createStore, which uses the reducer 
function to generate the initial state, and to calculate any future updates.

we write a function that knows how to get the latest state from the Redux 
store using the store.getState() method, then takes that value and updates 
the UI to show it.

function render() {
          const state = store.getState();
          valueEl.innerHTML = state.value.toString();
}


The Redux store lets us call store.subscribe() and pass a subscriber callback 
function that will be called every time the store is updated. So, we can pass 
our render function as the subscriber, and know that each time the store 
updates, we can update the UI with the latest value.

// Update the UI with the initial data
render();

// And subscribe to redraw whenever the data changes in the future
store.subscribe(render);

-: Dispatching Actions
Finally, we need to respond to user input by creating action objects that 
describe what happened, and dispatching them to the store. When we 
call store.dispatch(action), the store runs the reducer, calculates the 
updated state, and runs the subscribers to update the UI.

// Handle user inputs by "dispatching" action objects,
// which should describe "what happened" in the app
document.getElementById('increment').addEventListener('click', function () {
          store.dispatch({ type: 'counter/incremented' })
})

document.getElementById('decrement').addEventListener('click', function () {
          store.dispatch({ type: 'counter/decremented' })
})

Here, we'll dispatch the actions that will make the reducer add 1 or 
subtract 1 from the current counter value.

We can also write code that only dispatches an action if a certain 
condition is true, or write some async code that dispatches an action 
after a delay.



-: Part 2: Concepts and Data Flow
-: Background Concepts
Before we dive into some actual code, let's talk about some of the terms 
and concepts you'll need to know to use Redux.

-: State Management
Immutability
"Mutable" means "changeable". If something is "immutable", it can 
never be changed.

JavaScript objects and arrays are all mutable by default. If I create 
an object, I can change the contents of its fields. If I create an array, 
I can change the contents as well

In order to update values immutably, your code must make copies of 
existing objects/arrays, and then modify the copies.

We can do this by hand using JavaScript's array / object spread 
operators, as well as array methods that return new copies of the 
array instead of mutating the original array:

Redux expects that all state updates are done immutably

Redux Terminology
There's some important Redux terms that you'll need to be familiar 
with before we continue:

Actions
An action is a plain JavaScript object that has a type field. You 
can think of an action as an event that describes something that 
happened in the application.

The type field should be a string that gives this action a descriptive 
name, like "todos/todoAdded". We usually write that type string like 
"domain/eventName", where the first part is the feature or category 
that this action belongs to, and the second part is the specific thing 
that happened.

An action object can have other fields with additional information 
about what happened. By convention, we put that information in a 
field called payload.

A typical action object might look like this:
const addTodoAction = {
          type: 'todos/todoAdded',
          payload: 'Buy milk'
}


Reducers
A reducer is a function that receives the current state and an action object, 
decides how to update the state if necessary, and returns the new state: 
(state, action) => newState. You can think of a reducer as an event listener 
which handles events based on the received action (event) type.

The logic inside reducer functions typically follows the same series of steps:

Check to see if the reducer cares about this action
If so, make a copy of the state, update the copy with new values, and return it
Otherwise, return the existing state unchanged
Here's a small example of a reducer, showing the steps that each reducer should follow:

const initialState = { value: 0 }

function counterReducer(state = initialState, action) {
          // Check to see if the reducer cares about this action
          if (action.type === 'counter/incremented') {
                    // If so, make a copy of `state`
                    return {
                              ...state,

                              // and update the copy with the new value
                              value: state.value + 1
                    }
          }

          // otherwise return the existing state unchanged
          return state
}

Reducers can use any kind of logic inside to decide what the new state 
should be: if/else, switch, loops, and so on.


-: Store
The current Redux application state lives in an object called the store .
The store is created by passing in a reducer, and has a method called 
getState that returns the current state value:

import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({ reducer: counterReducer })

console.log(store.getState())           // {value: 0}


-: Dispatch
The Redux store has a method called dispatch. The only way to update 
the state is to call store.dispatch() and pass in an action object. The 
store will run its reducer function and save the new state value inside, 
and we can call getState() to retrieve the updated value:

store.dispatch({ type: 'counter/incremented' })

console.log(store.getState())           // {value: 1}

You can think of dispatching actions as "triggering an event" in the 
application. Something happened, and we want the store to know 
about it. Reducers act like event listeners, and when they hear an 
action they are interested in, they update the state in response.

-: Selectors
Selectors are functions that know how to extract specific pieces of 
information from a store state value

const selectCounterValue = state => state.value

const currentValue = selectCounterValue(store.getState())
console.log(currentValue)               // 2


-: Part 3: State, Actions, and Reducers
We can also say that the todos are "app state" (the core data that the 
application works with), while the filtering values are "UI state" 
(state that describes what the app is doing right now)

we can create a list of actions that our application will use:
{type: 'todos/todoAdded', payload: todoText}
{type: 'todos/todoToggled', payload: todoId}
{type: 'todos/colorSelected, payload: {todoId, color}}
{type: 'todos/todoDeleted', payload: todoId}
{type: 'todos/allCompleted'}
{type: 'todos/completedCleared'}
{type: 'filters/statusFilterChanged', payload: filterValue}
{type: 'filters/colorFilterChanged', payload: {color, changeType}}

-: Designing the State Structure
With Redux, our application state is always kept in plain JavaScript 
objects and arrays

-: Writing Reducers
Reducers are functions that take the current state and an action as 
arguments, and return a new state result. 
In other words, (state, action) => newState.

-: Creating the Root Reducer
A Redux app really only has one reducer function: the "root reducer" 
function that you will pass to createStore later on. That one root 
reducer function is responsible for handling all of the actions that 
are dispatched, and calculating what the entire new state result 
should be every time.

-: Splitting Reducers
As part of this, Redux reducers are typically split apart based on the 
section of the Redux state that they update. Our todo app state 
currently has two top-level sections: state.todos and state.filters. 
So, we can split the large root reducer function into two smaller 
reducers - a todosReducer and a filtersReducer

the reducer for a specific section of the Redux app state is called a 
"slice reducer"

-: Combining Reducers
The Redux core library includes a utility called combineReducers, 
which does this same boilerplate step for us. We can replace our 
hand-written rootReducer with a shorter one generated by combineReducers.
Now that we need combineReducers, it's time to actually install the Redux core library:

npm install redux

Remember, the key names you give to combineReducers decides what the key 
names of your state object will be!

Actions may contain other values, which are typically stored in the action.payload field

Reducer:
https://codesandbox.io/s/github/reduxjs/redux-fundamentals-example-app/tree/checkpoint-1-combinedReducers/?from-embed=&file=/src/features/todos/todosSlice.js

https://codesandbox.io/s/github/reduxjs/redux-fundamentals-example-app/tree/tutorial-steps

Store:
https://codesandbox.io/s/github/reduxjs/redux-fundamentals-example-app/tree/checkpoint-2-storeSetup/?from-embed=&file=/src/reducer.js

-: Part 4: Store
The central piece of a Redux app: the store.

Redux Store
The Redux store brings together the state, actions, and reducers that make up your app. 

The store has several responsibilities:
1. Holds the current application state inside
2. Allows access to the current state via store.getState();
3. Allows state to be updated via store.dispatch(action);
4. Registers listener callbacks via store.subscribe(listener);
5. Handles unregistering of listeners via the unsubscribe function returned 
by store.subscribe(listener).

It's important to note that you'll only have a single store in a Redux application. 

Creating a Store
Every Redux store has a single root reducer function. In the previous section, 
we created a root reducer function using combineReducers

deprecated
import { createStore } from 'redux'
const store = createStore(rootReducer);


import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer'


const store = configureStore(rootReducer);

export default store;


-: Loading Initial State
createStore can also accept a preloadedState value as its second argument. 
You could use this to add initial data when the store is created, such as 
values that were included in an HTML page sent from the server, or 
persisted in localStorage and read back when the user visits the page 
again, like this:

import { createStore } from 'redux'
import { rootReducer } from './rootReducer'

let preloadedState;
const persistedTodoString = localStorage.getItem('todos')

if (persistedTodoString) {
          preloadedState = {
                    todos: JSON.parse(persistedTodoString)
          }
}

const store = createStore(rootReducer, preloadedState)


Dispatching Actions
Now that we have created a store, let's verify our program works! Even 
without any UI, we can already test the update logic.

TIP
Before you run this code, try going back to src/features/todos/todosSlice.js, 
and remove all the example todo objects from the initialState so that it's an 
empty array. That will make the output from this example a bit easier to read.

src/index.js
// Omit existing React imports

import store from './store'

// Log the initial state
console.log('Initial state: ', store.getState())
// {todos: [....], filters: {status, colors}}

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() =>
          console.log('State after dispatch: ', store.getState())
)

// Now, dispatch some actions

store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about actions' })
store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about reducers' })
store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about stores' })

store.dispatch({ type: 'todos/todoToggled', payload: 0 })
store.dispatch({ type: 'todos/todoToggled', payload: 1 })

store.dispatch({ type: 'filters/statusFilterChanged', payload: 'Active' })

store.dispatch({
          type: 'filters/colorFilterChanged', payload: { color: 'red', changeType: 'added' }
})

// Stop listening to state updates
unsubscribe()

// Dispatch one more action to see what happens

store.dispatch({ type: 'todos/todoAdded', payload: 'Try creating a store' })

// Omit existing React rendering logic


Remember, every time we call store.dispatch(action):

The store calls rootReducer(state, action)
That root reducer may call other slice reducers inside of itself, 
like todosReducer(state.todos, action)
The store saves the new state value inside
The store calls all the listener subscription callbacks
If a listener has access to the store, it can now call store.getState() to 
read the latest state value

Notice that our app did not log anything from the last action. That's because we 
removed the listener callback when we called unsubscribe(), so nothing else ran 
after the action was dispatched.

We specified the behavior of our app before we even started writing the UI. That 
helps give us confidence that the app will work as intended.

INFO
If you want, you can now try writing tests for your reducers. Because they're 
pure functions, it should be straightforward to test them. Call them with an 
example state and action, take the result, and check to see if it matches what 
you expect:

// todosSlice.spec.js
import todosReducer from './todosSlice'

test('Toggles a todo based on id', () => {
          const initialState = [{ id: 0, text: 'Test text', completed: false }]

          const action = { type: 'todos/todoToggled', payload: 0 }
          const result = todosReducer(initialState, action)
          expect(result[0].completed).toBe(true)
})

-: Inside a Redux Store
It might be helpful to take a peek inside a Redux store to see how it works. 
Here's a miniature example of a working Redux store, in about 25 lines of code:

function createStore(reducer, preloadedState) {
          let state = preloadedState
          const listeners = []

          function getState() {
                    return state
          }

          function subscribe(listener) {
                    listeners.push(listener)

                    return function unsubscribe() {
                              const index = listeners.indexOf(listener)

                              listeners.splice(index, 1)
                    }
          }

          function dispatch(action) {
                    state = reducer(state, action)

                    listeners.forEach(listener => listener())
          }

          dispatch({ type: '@@redux/INIT' })

          return { dispatch, subscribe, getState }
}

The store has the current state value and reducer function inside of itself:
getState returns the current state value

subscribe keeps an array of listener callbacks and returns a function to 
remove the new callback

dispatch calls the reducer, saves the state, and runs the listeners

The store dispatches one action on startup to initialize the reducers with their state

The store API is an object with {dispatch, subscribe, getState} inside

To emphasize one of those in particular: notice that getState just returns 
whatever the current state value is.

-: Configuring the Store
We've already seen that we can pass rootReducer and preloadedState arguments 
to createStore. However, createStore can also take one more argument, which is 
used to customize the store's abilities and give it new powers.

Redux stores are customized using something called a store enhancer. A store 
enhancer is like a special version of createStore that adds another layer 
wrapping around the original Redux store. An enhanced store can then change 
how the store behaves, by supplying its own versions of the store's dispatch, 
getState, and subscribe functions instead of the originals.

For this tutorial, we won't go into details about how store enhancers actually 
work - we'll focus on how to use them.

Store enhancers are a very powerful way to modify the store, and almost 
all Redux apps will include at least one enhancer when setting up the store.

TIP
If you don't have any preloadedState to pass in, you can pass the enhancer 
as the second argument instead:

const store = createStore(rootReducer, storeEnhancer)


-: Middleware
Enhancers are powerful because they can override or replace any of 
the store's methods: dispatch, getState, and subscribe.

Redux uses a special kind of addon called middleware to let 
us customize the dispatch function.

Redux middleware provides a third-party extension point between 
dispatching an action, and the moment it reaches the reducer. 
People use Redux middleware for logging, crash reporting, talking 
to an asynchronous API, routing, and more.


Using Middleware
We already saw that you can customize a Redux store using store 
enhancers. Redux middleware are actually implemented on top of 
a very special store enhancer that comes built in with Redux, 
called applyMiddleware.

-: Your First Custom Middleware
Let's say we want to add some logging to our application. We'd 
like to see the contents of each action in the console when it's 
dispatched, and we'd like to see what the state is after the action 
has been handled by the reducers.

const loggerMiddleware = storeAPI => next => action => {
          console.log('dispatching ', action);

          let result = next(action);
          console.log('next state', storeAPI.getState());
          
          return result;
}

Whenever an action is dispatched:

The first part of the handleAction function runs, and we 
print 'dispatching'

We pass the action to the next section, which may be 
another middleware or the real store.dispatch

Eventually the reducers run and the state is updated, 
and the next function returns

We can now call storeAPI.getState() and see what the 
new state is

We finish by returning whatever result value came 
from the next middleware

In particular, middleware are intended to contain logic 
with side effects. In addition, middleware can modify 
dispatch to accept things that are not plain action objects. 

-: Redux DevTools
Redux was built to enable the use of the Redux DevTools - an addon 
that shows you a history of what actions were dispatched, what those 
actions contained, and how the state changed after each dispatched action.

The Redux DevTools UI is available as a browser extension for Chrome and Firefox.

-: Adding the DevTools to the Store
Once the extension is installed, we need to configure the store so that 
the DevTools can see what's happening inside. The DevTools require 
a specific store enhancer to be added to make that possible.

The Redux DevTools Extension docs have some instructions on 
how to set up the store, but the steps listed are a bit complicated. 
However, there's an NPM package called redux-devtools-extension 
that takes care of the complicated part. That package exports a 
specialized composeWithDevTools function that we can use 
instead of the original Redux compose function.

import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducer'
import { print1, print2, print3 } from './exampleAddons/middleware'

const composedEnhancer = composeWithDevTools(
          // EXAMPLE: Add whatever middleware you actually want to use here
          applyMiddleware(print1, print2, print3)
          // other store enhancers if any
)

const store = createStore(rootReducer, composedEnhancer)
export default store

What You've Learned
As you've seen, the store is the central piece of every Redux application. 
Stores contain state and handle actions by running reducers, and can 
be customized to add additional behaviors.

subscribe takes a listener callback that runs each time an action is dispatched

Middleware are the main way to customize the store
Middleware are added using the applyMiddleware enhancer
Middleware are written as three nested functions inside each other
Middleware run each time an action is dispatched
Middleware can have side effects inside

The Redux DevTools let you see what's changed in your app over time
The DevTools Extension can be installed in your browser
The store needs the DevTools enhancer added, using composeWithDevTools
The DevTools show dispatched actions and changes in state over time



*/ 
