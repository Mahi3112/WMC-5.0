// store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk'; // Correct import for thunk
import adminReducer from '../src/reducers/AdminPageReducer'; // Import default export
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {};

const rootReducer = combineReducers({
    admin: adminReducer, // Correctly assigned reducer
    // Add other reducers here
});

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk)) // Apply middleware and Redux DevTools extension
);

export default store;
