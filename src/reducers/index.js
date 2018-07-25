import { combineReducers } from 'redux';
import { resultsReducer } from './results/resultsReducer';
import { ridersReducer } from './ridersReducer';

export const rootReducer = combineReducers({
  results: resultsReducer,
  riders: ridersReducer
});