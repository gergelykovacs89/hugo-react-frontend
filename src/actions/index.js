import { userConstants, authorConstants, storyRootConstants } from "./types";
import users from "../apis/users";
import authors from "../apis/authors";
import story from "../apis/story";
import setAuthToken from "../helpers/setAuthToken";
import history from "../history";
import jwt_decode from "jwt-decode";
import { getStoryRootsByAuthorId } from "../actions/story";
import { getTextsByAuthorId } from "../actions/text";

export const registerRequest = formValues => async dispatch => {
  try {
    const response = await users.post("/register", formValues);
    dispatch({
      type: userConstants.REGISTER_SUCCESS,
      payload: response.data.message
    });
    history.push("/login");
  } catch (error) {
    handleFormErrors(error, dispatch);
  }
};

export const loginRequest = formValues => async dispatch => {
  dispatch({ type: userConstants.LOGIN_START });
  try {
    let response = null;
    if (formValues !== null) {
      response = await credentialsLogin(formValues);
    } else {
      response = await tokenLogin();
    }
    setAuthToken(response.data.jwtToken);
    localStorage.setItem("jwtToken", response.data.jwtToken);
    const decoded = jwt_decode(response.data.jwtToken);
    dispatch({ type: userConstants.LOGIN_SUCCESS, payload: decoded });
    dispatch({
      type: userConstants.SET_AUTHORS,
      payload: response.data.authors
    });
    if (localStorage.getItem("authorId")) {
      dispatch(selectAuthor(localStorage.getItem("authorId"), false));
    } else {
      history.push("/select-author");
    }
  } catch (error) {
    dispatch({ type: userConstants.LOGIN_FAILED });
    handleFormErrors(error, dispatch);
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("authorId");
  dispatch({ type: userConstants.LOGOUT });
  history.push("/");
};

export const addAuthor = formValues => async dispatch => {
  try {
    const response = await authors.post("/new-author", formValues);
    dispatch({
      type: authorConstants.ADD_AUTHOR_SUCCESS,
      payload: response.data
    });
    history.push("/select-author");
  } catch (error) {
    handleFormErrors(error, dispatch);
  }
};

export const editAuthor = (formValues, authorId) => async dispatch => {
  try {
    const response = await authors.put(`/edit-author/${authorId}`, formValues);
    dispatch({
      type: authorConstants.EDIT_AUTHOR_SUCCESS,
      payload: response.data.authorUpdated
    });
    history.push("/select-author");
  } catch (error) {
    handleFormErrors(error, dispatch);
  }
};

export const fetchAuthor = authorId => async dispatch => {
  try {
    setAuthToken(localStorage.getItem("jwtToken"));
    const response = await authors.get(`/get-author/${authorId}`);
    dispatch({
      type: authorConstants.FETCH_AUTHOR,
      payload: response.data.author
    });
  } catch (error) {
    handleFormErrors(error, dispatch);
  }
};

export const getAuthor = authorId => async dispatch => {
  try {
    const response = await authors.get(`/get-author-detail/${authorId}`);
    dispatch({
      type: authorConstants.GET_AUTHOR,
      payload: response.data.author
    });
  } catch (error) {
    handleFormErrors(error, dispatch);
  }
};

export const getStoryRootsForVisitedAuthor = authorId => async dispatch => {
  try {
    setAuthToken(localStorage.getItem("jwtToken"));
    const response = await story.get(`/story-roots/${authorId}`);
    dispatch({
      type: storyRootConstants.SET_STORY_ROOTS_FOR_VISITED_AUTHOR,
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const unSetAuthor = () => dispatch => {
  dispatch({ type: authorConstants.UN_SET_AUTHOR });
};

export const deleteAuthor = authorId => async dispatch => {
  try {
    await authors.delete(`/delete-author/${authorId}`);
    dispatch({
      type: authorConstants.DELETE_AUTHOR_SUCCESS,
      payload: authorId
    });
  } catch (error) {
    handleFormErrors(error, dispatch);
  }
};

export const followAuthor = (
  selectAuthorId,
  authorToFollowId
) => async dispatch => {
  try {
    const response = await authors.post(`/follow-author`, {
      selectAuthorId,
      authorToFollowId
    });
    if (response.data.message === "UPDATED") {
      dispatch({
        type: authorConstants.FOLLOW_SUCCESS,
        payload: { selectAuthorId, authorToFollowId }
      });
    }
  } catch (error) {
    handleFormErrors(error, dispatch);
  }
};

export const unFollowAuthor = (selectAuthorId, authorToUnFollowId) => async (
  dispatch,
  getState
) => {
  try {
    const response = await authors.post(`/unfollow-author`, {
      selectAuthorId,
      authorToUnFollowId
    });
    if (response.data.message === "UPDATED") {
      dispatch({
        type: authorConstants.UN_FOLLOW_SUCCESS,
        payload: { selectAuthorId, authorToUnFollowId }
      });
    }
  } catch (error) {
    handleFormErrors(error, dispatch);
  }
};

export const selectAuthor = (authorId, redirect) => dispatch => {
  localStorage.setItem("authorId", authorId);
  dispatch(getStoryRootsByAuthorId(authorId));
  dispatch(getTextsByAuthorId(authorId));
  dispatch({ type: authorConstants.SELECT_AUTHOR, payload: authorId });
  if (redirect) {
    history.push(`/a/${authorId}`);
  }
};

export const onSelectAuthor = () => dispatch => {
  localStorage.removeItem("authorId");
  dispatch({ type: authorConstants.ONSELECT_AUTHOR });
  history.push("/select-author");
};

export const clearErrors = () => dispatch => {
  dispatch({ type: userConstants.CLEAR_ERRORS });
};

const credentialsLogin = async formValues => {
  const response = await users.post("/login", formValues);
  return response;
};
const tokenLogin = async () => {
  setAuthToken(localStorage.getItem("jwtToken"));
  const response = await authors.get("/user-authors");
  return response;
};

const handleFormErrors = (error, dispatch) => {
  if (error.response !== undefined) {
    dispatch({ type: userConstants.GET_ERRORS, payload: error.response.data });
  }
};
