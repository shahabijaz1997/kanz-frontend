import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../slicer/auth.slicer';

const rootReducer = combineReducers({
  auth: authReducer
});

export default rootReducer;
