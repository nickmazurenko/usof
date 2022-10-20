import * as Types from './types';

const initialState = [];

export default notify = (action, state = initialState) => {
  switch (action.type) {
    case Types.CREATE_NOTIFICATION:
      return [...state, action.data];
    case Types.REMOVE_NOTIFICATION:
      return state.filter((notification) => notification.id !== action.data);
    default:
      return state;
  }
};
