export const resultsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_RESULTS':
      return [...state, ...action.results];
    case 'UPDATE_RESULT':
      return action.results;
    default:
      return state;
  }
};