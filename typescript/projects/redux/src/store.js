/*
deprecated
import { createStore } from 'redux'
const store = createStore(rootReducer);
*/


// import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'
import { includeMeaningOfLife, sayHiOnDispatch } from './exampleAddons/enhancers';


// const store = configureStore({reducer: rootReducer});

import { compose, createStore } from 'redux';

/*
What we really need is some way to merge both the sayHiOnDispatch 
enhancer and the includeMeaningOfLife enhancer into a single 
combined enhancer, and then pass that instead.

Fortunately, the Redux core includes a compose function that can 
be used to merge multiple enhancers together. 
*/

const composedEnhancer = compose(sayHiOnDispatch, includeMeaningOfLife)

// We don't have a preloadedState value here, so we'll pass undefined as the second argument instead.
const store = createStore(rootReducer, undefined, composedEnhancer);

export default store;