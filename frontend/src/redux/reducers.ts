import { combineReducers } from '@reduxjs/toolkit';
import songsReducer from '../redux/slices/songSlice';

// Combine your reducers here
const rootReducer = combineReducers({
  songs: songsReducer,
  // other reducers...
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;