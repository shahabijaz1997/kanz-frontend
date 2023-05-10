import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../slicer/auth.slicer';
import languageReducer from '../slicer/language.slicer';
import userReducer from '../slicer/user.slicer';

const rootReducer = combineReducers({
  auth: authReducer,
  language: languageReducer,
  user: userReducer
});

export default rootReducer;
