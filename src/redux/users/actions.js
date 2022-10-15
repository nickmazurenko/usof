import Users from "../../api/users";

const getUsers = () => async (dispatch) => {
  try {
    const response = await Users.usersData();
    dispatch({
      type: "GET_USERS",
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: "USERS_ERROR",
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

const getCurrentUser = () => async (dispatch) => {
  try {

  } catch (error) {
    dispatch({
      type: ""
    })
  }
} 
