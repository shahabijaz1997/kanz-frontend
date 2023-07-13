import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../slicer/auth.slicer';
import languageReducer from '../slicer/language.slicer';
import userReducer from '../slicer/user.slicer';
import metadataReducer from '../slicer/metadata.slicer';
import philosophyReducer from '../slicer/philosophy.slicer';
import eventReducer from '../slicer/event.slicer';
import attachmentsReducer from '../slicer/attachments.slicer';
import orientaionReducer from '../slicer/orientation.slicer';

const rootReducer = combineReducers({
  auth: authReducer,
  language: languageReducer,
  user: userReducer,
  metadata: metadataReducer,
  philosophy: philosophyReducer,
  event: eventReducer,
  attachments: attachmentsReducer,
  orientation: orientaionReducer,
});

export default rootReducer;
