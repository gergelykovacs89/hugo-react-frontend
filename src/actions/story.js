import { userConstants, storyRootConstants, textConstants } from "./types";
import history from "../history";
import story from "../apis/story";
import setAuthToken from "../helpers/setAuthToken";

export const createStory = formValues => async (dispatch, getState) => {
  try {
    formValues._authorId = getState().user.authorId;
    const response = await story.post("/create", formValues);
    dispatch({ type: storyRootConstants.CREATE_STORY_ROOT_SUCCESS, payload: response.data });
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
      type: storyRootConstants.EDIT_STORY_ROOT_SUCCESS,
      payload: response.data.storyRootUpdated
    });
    dispatch({ type: textConstants.EDIT_TEXT, payload: response.data.textUpdated });
    dispatch({ type: textConstants.LOAD_TEXT, payload: response.data.textUpdated });
    history.push(`/sw/${response.data.storyRootUpdated._id}`);
  } catch (error) {
    handleFormErrors(error, dispatch);
  }
};

export const getStoryRootsByAuthorId = authorId => async dispatch => {
  try {
    const response = await story.get(`/story-roots/${authorId}`);
    dispatch({ type: storyRootConstants.SET_STORY_ROOTS, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const getStoryRoot = storyRootId => async dispatch => {
  try {
    setAuthToken(localStorage.getItem("jwtToken"));
    const response = await story.get(`/root/${storyRootId}`);
    dispatch({ type: storyRootConstants.FETCH_STORY_ROOT, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchRootToEdit = storyRootId => async dispatch => {
  try {
    setAuthToken(localStorage.getItem("jwtToken"));
    const response = await story.get(`/root/${storyRootId}`);
    dispatch({ type: storyRootConstants.FETCH_STORY_ROOT_TO_EDIT, payload: response.data.root });
  } catch (error) {
    console.log(error);
  }
};

export const unSetStoryRoot = () => dispatch => {
  dispatch({ type: storyRootConstants.UN_SET_STORY_ROOT });
};

const handleFormErrors = (error, dispatch) => {
  if (error.response !== undefined) {
    dispatch({ type: userConstants.GET_ERRORS, payload: error.response.data });
  }
};
