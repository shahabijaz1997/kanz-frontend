import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../slicer/auth.slicer';
import languageReducer from '../slicer/language.slicer';
import userReducer from '../slicer/user.slicer';
import metadataReducer from '../slicer/metadata.slicer';
import philisophyReducer from '../slicer/philisophy.slicer';
import eventReducer from '../slicer/event.slicer';

const rootReducer = combineReducers({
  auth: authReducer,
  language: languageReducer,
  user: userReducer,
  metadata: metadataReducer,
  philisophy: philisophyReducer,
  event: eventReducer
});

export default rootReducer;
