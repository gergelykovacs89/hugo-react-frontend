import {
  GET_ERRORS,
  SET_STORY_ROOTS,
  CREATE_STORY_ROOT_SUCCESS
} from "./types";
import history from "../history";
import story from "../apis/story";

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

export const getStoryRootsByAuthorId = authorId => async dispatch => {
  try {
    const response = await story.get(`/story-roots/${authorId}`);
    dispatch({ type: SET_STORY_ROOTS, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

const handleFormErrors = (error, dispatch) => {
  if (error.response !== undefined) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};