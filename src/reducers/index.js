import { combineReducers } from 'redux';
import { resultsReducer } from './resultsReducer';

export const rootReducer = combineReducers({
  results: resultsReducer
});