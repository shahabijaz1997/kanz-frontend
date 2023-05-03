import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../slicer/auth.slicer';
import languageReducer from '../slicer/language.slicer';

const rootReducer = combineReducers({
  auth: authReducer,
  language: languageReducer
});

export default rootReducer;
