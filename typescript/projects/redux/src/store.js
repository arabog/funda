/*
deprecated
import { createStore } from 'redux'
const store = createStore(rootReducer);
*/


import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer'


const store = configureStore(rootReducer);


export default store;