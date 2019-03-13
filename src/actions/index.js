import {
  REGISTER_SUCCESS,
  GET_ERRORS,
  LOGIN_SUCCESS,
  SET_AUTHORS,
  LOGOUT,
  ADD_AUTHOR_SUCCESS,
  FETCH_AUTHOR,
  EDIT_AUTHOR_SUCCESS,
  CLEAR_ERRORS,
  DELETE_AUTHOR_SUCCESS,
  SELECT_AUTHOR,
  LOGIN_START
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
  dispatch({ type: LOGIN_START });
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
    if (localStorage.getItem("authorId")) {
      dispatch({
        type: SELECT_AUTHOR,
        payload: localStorage.getItem("authorId")
      });
    }
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("authorId");
  dispatch({ type: LOGOUT });
  history.push("/");
};

export const addAuthor = formValues => async dispatch => {
  try {
    const response = await users.post("/new-author", formValues);
    dispatch({ type: ADD_AUTHOR_SUCCESS, payload: response.data });
    history.push("/select-author");
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const editAuthor = (formValues, authorId) => async dispatch => {
  try {
    const response = await users.put(`/edit-author/${authorId}`, formValues);
    dispatch({
      type: EDIT_AUTHOR_SUCCESS,
      payload: response.data.authorUpdated
    });
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

export const deleteAuthor = authorId => async dispatch => {
  try {
    await users.delete(`/delete-author/${authorId}`);
    dispatch({ type: DELETE_AUTHOR_SUCCESS, payload: authorId });
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const selectAuthor = authorId => dispatch => {
  localStorage.setItem("authorId", authorId);
  dispatch({ type: SELECT_AUTHOR, payload: authorId });
  history.push(`/a/${authorId}`);
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
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
