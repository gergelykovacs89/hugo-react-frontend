import { REGISTER_SUCCESS, GET_ERRORS } from "./types";
import users from "../apis/users";
import history from "../history";

export const registerRequest = formValues => async (dispatch, getState) => {
  try {
    const response = await users.post("/register", formValues);
    dispatch({ type: REGISTER_SUCCESS, payload: response.data.message });
    history.push("/login");
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};
