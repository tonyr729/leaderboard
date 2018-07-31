import { combineReducers } from 'redux';
import { resultsReducer } from './results/resultsReducer';
import { ridersReducer } from './riders/ridersReducer';
import { videosReducer } from './videos/videosReducer';


export const rootReducer = combineReducers({
  results: resultsReducer,
  riders: ridersReducer,
  watchedVideos: videosReducer
});