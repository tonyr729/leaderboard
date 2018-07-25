export const ridersReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_RIDERS':
      return [...state, ...action.riders];
    default:
      return state;
  }
};