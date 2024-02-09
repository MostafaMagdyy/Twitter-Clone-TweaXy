import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './reducers';

const rootReducer = combineReducers({
    user: userReducer,
    // Add other reducers here if needed
});

export default rootReducer;