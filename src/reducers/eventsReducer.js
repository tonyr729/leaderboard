export const eventsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_EVENTS':
      return [...state, ...action.events];
    default:
      return state;
  }
};