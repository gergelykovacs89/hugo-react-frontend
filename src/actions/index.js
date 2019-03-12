import {
  REGISTER_SUCCESS,
  GET_ERRORS,
  LOGIN_SUCCESS,
  SET_AUTHORS,
  LOGOUT,
  ADD_AUTHOR_SUCCESS,
  FETCH_AUTHOR
} from "./types";
import users from "../apis/users";
import setAuthToken from "../helpers/setAuthToken";
import history from "../history";
import jwt_decode from "jwt-decode";

export const registerRequest = formValues => async dispatch => {
  try {
    const response = await users.post("/register", formValues);
    dispatch({ type: REGISTER_SUCCESS, payload: response.data.message });
    history.push("/login");
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const loginRequest = formValues => async dispatch => {
  try {
    let response = null;
    if (formValues !== null) {
      response = await credentialsLogin(formValues);
      history.push("/select-author");
    } else {
      response = await tokenLogin();
    }
    setAuthToken(response.data.jwtToken);
    localStorage.setItem("jwtToken", response.data.jwtToken);
    const decoded = jwt_decode(response.data.jwtToken);
    dispatch({ type: LOGIN_SUCCESS, payload: decoded });
    dispatch({ type: SET_AUTHORS, payload: response.data.authors });
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken");
  dispatch({ type: LOGOUT });
  history.push("/");
};

export const addAuthor = formValues => async (dispatch, getState) => {
  try {
    const response = await users.post("/new-author", formValues);
    dispatch({ type: ADD_AUTHOR_SUCCESS, payload: response.data });
    history.push("/select-author");
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const fetchAuthor = authorId => async dispatch => {
  try {
    setAuthToken(localStorage.getItem("jwtToken"));
    const response = await users.get(`/get-author/${authorId}`);
    dispatch({ type: FETCH_AUTHOR, payload: response.data.author });
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

const credentialsLogin = async formValues => {
  const response = await users.post("/login", formValues);
  return response;
};
const tokenLogin = async () => {
  setAuthToken(localStorage.getItem("jwtToken"));
  const response = await users.get("/user-authors");
  return response;
};
