import authReducer from './authReducers'
import noteReducer from './noteReducer'
import { firestoreReducer } from 'redux-firestore'
import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase';

const mainReducer = combineReducers({
    auth: authReducer,
    note: noteReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
  });

export default mainReducer;