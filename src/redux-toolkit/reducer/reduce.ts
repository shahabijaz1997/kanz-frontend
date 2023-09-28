import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../slicer/auth.slicer';
import languageReducer from '../slicer/language.slicer';
import userReducer from '../slicer/user.slicer';
import metadataReducer from '../slicer/metadata.slicer';
import questionnaireReducer from '../slicer/philosophy.slicer';
import eventReducer from '../slicer/event.slicer';
import attachmentsReducer from '../slicer/attachments.slicer';
import orientaionReducer from '../slicer/orientation.slicer';
import dataHolderReducer from '../slicer/dataHolder.slicer';

const rootReducer = combineReducers({
  auth: authReducer,
  language: languageReducer,
  user: userReducer,
  metadata: metadataReducer,
  questionnaire: questionnaireReducer,
  event: eventReducer,
  attachments: attachmentsReducer,
  orientation: orientaionReducer,
  dataHolder: dataHolderReducer
});

export default rootReducer;
