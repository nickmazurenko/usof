import uuid from 'uuid';
import * as Types from './types';

export default createNotification = (message, type, timeout = 5000) => (dispatch) => {
  const id = uuid.uuidv4();
  dispatch({
    type: Types.CREATE_NOTIFICATION,
    data: { message, type, id },
  });

  setTimeout(
    () => dispatch({ type: Types.REMOVE_NOTIFICATION, data: id }),
    timeout,
  );
};
