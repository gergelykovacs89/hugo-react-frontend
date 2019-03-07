import { REGISTER_FAIL, REGISTER_SUCCESS, CLEAR_ALERTS } from "./types";
import users from "../apis/users";

export const registerRequest = formValues => async (dispatch, getState) => {
  try {
    const response = await users.post("/register", formValues);
    console.log(response);
    if (response.status !== 200) {
      throw Error(response.error);
    } else {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: { message: response.data.message }
      });
    }
  } catch (error) {
    if (error.message === "Request failed with status code 409") {
      dispatch({
        type: REGISTER_FAIL,
        payload: { err: "Email address already in use." }
      });
    }
  }
};

export const clearAlerts = () => {
  return {
    type: CLEAR_ALERTS
  };
};
