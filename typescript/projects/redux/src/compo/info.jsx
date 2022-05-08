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









*/ 