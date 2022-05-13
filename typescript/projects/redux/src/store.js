/*
deprecated
import { createStore } from 'redux'
const store = createStore(rootReducer);
*/

/*
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'


const store = configureStore({reducer: rootReducer});
export default store;
*/

/*
import { compose, createStore } from 'redux';
import rootReducer from './rootReducer'
import { includeMeaningOfLife, sayHiOnDispatch } from './exampleAddons/enhancers';

What we really need is some way to merge both the sayHiOnDispatch 
enhancer and the includeMeaningOfLife enhancer into a single 
combined enhancer, and then pass that instead.

Fortunately, the Redux core includes a compose function that can 
be used to merge multiple enhancers together. 


const composedEnhancer = compose(sayHiOnDispatch, includeMeaningOfLife)

// We don't have a preloadedState value here, so we'll pass undefined as the second argument instead.
const store = createStore(rootReducer, undefined, composedEnhancer);

export default store;
*/

/*
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './rootReducer'

import { print1, print2, print3 } from './exampleAddons/middleware'

const middlewareEnhancer = applyMiddleware(print1, print2, print3);

// Pass enhancer as the second arg, since there's no preloadedState
const store = createStore(rootReducer, middlewareEnhancer);

export default store;
*/

import { configureStore, applyMiddleware} from '@reduxjs/toolkit';
import { thunkMiddleware } from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './rootReducer'

// import { print1, print2, print3 } from './exampleAddons/middleware'


// const composedEnhancer = composeWithDevTools(
          // EXAMPLE: Add whatever middleware you actually want to use here
          // applyMiddleware(print1, print2, print3)
          // other store enhancers if any
// )

          

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

const store = configureStore({reducer: rootReducer}, composedEnhancer);

export default store