import { combineReducers } from 'redux';
import { resultsReducer } from './results/resultsReducer';
import { ridersReducer } from './riders/ridersReducer';



export const rootReducer = combineReducers({
  results: resultsReducer,
  riders: ridersReducer
});