import {
  GET_ERRORS,
  SET_STORY_ROOTS,
  CREATE_STORY_ROOT_SUCCESS,
  FETCH_STORY_ROOT,
  UN_SET_STORY_ROOT,
  FETCH_STORY_ROOT_TO_EDIT,
  EDIT_TEXT,
  LOAD_TEXT,
  EDIT_STORY_ROOT_SUCCESS
} from "./types";
import history from "../history";
import story from "../apis/story";
import setAuthToken from "../helpers/setAuthToken";

export const createStory = formValues => async (dispatch, getState) => {
  try {
    formValues._authorId = getState().user.authorId;
    const response = await story.post("/create", formValues);
    dispatch({ type: CREATE_STORY_ROOT_SUCCESS, payload: response.data });
    history.push(`/sw/${response.data._id}`);
  } catch (error) {
    handleFormErrors(error, dispatch);
  }
};

export const updateStory = (formValues, storyRootId) => async (
  dispatch,
  getState
) => {
  try {
    formValues._authorId = getState().user.authorId;
    const response = await story.put(`/update/${storyRootId}`, formValues);
    dispatch({
      type: EDIT_STORY_ROOT_SUCCESS,
      payload: response.data.storyRootUpdated
    });
    dispatch({ type: EDIT_TEXT, payload: response.data.textUpdated });
    dispatch({ type: LOAD_TEXT, payload: response.data.textUpdated });
    history.push(`/sw/${response.data.storyRootUpdated._id}`);
  } catch (error) {
    handleFormErrors(error, dispatch);
  }
};

export const getStoryRootsByAuthorId = authorId => async dispatch => {
  try {
    const response = await story.get(`/story-roots/${authorId}`);
    dispatch({ type: SET_STORY_ROOTS, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const getStoryRoot = storyRootId => async dispatch => {
  try {
    setAuthToken(localStorage.getItem("jwtToken"));
    const response = await story.get(`/root/${storyRootId}`);
    dispatch({ type: FETCH_STORY_ROOT, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchRootToEdit = storyRootId => async dispatch => {
  try {
    setAuthToken(localStorage.getItem("jwtToken"));
    const response = await story.get(`/root/${storyRootId}`);
    dispatch({ type: FETCH_STORY_ROOT_TO_EDIT, payload: response.data.root });
  } catch (error) {
    console.log(error);
  }
};

export const unSetStoryRoot = () => dispatch => {
  dispatch({ type: UN_SET_STORY_ROOT });
};

const handleFormErrors = (error, dispatch) => {
  if (error.response !== undefined) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};
