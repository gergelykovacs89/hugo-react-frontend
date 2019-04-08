import text from "../apis/text";
import { textConstants } from "./types";
import setAuthToken from "../helpers/setAuthToken";

export const fetchText = textId => async (dispatch, getState) => {
  try {
    setAuthToken(localStorage.getItem("jwtToken"));
    const response = await text.get(`/${textId}`);
    if (response.data._authorId === localStorage.getItem("authorId")) {
      dispatch({ type: textConstants.ADD_TEXT, payload: response.data });
      dispatch({ type: textConstants.LOAD_TEXT, payload: response.data });
    } else {
      dispatch({ type: textConstants.LOAD_TEXT, payload: response.data });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateText = (newTextState, textId) => async (
  dispatch,
  getState
) => {
  try {
    const response = await text.put(`/update/${textId}`, { newTextState });
    if (response.data.textUpdated._authorId === getState().user.authorId) {
      dispatch({ type: textConstants.EDIT_TEXT, payload: response.data.textUpdated });
      dispatch({ type: textConstants.LOAD_TEXT, payload: response.data.textUpdated });
    } else {
      dispatch({ type: textConstants.LOAD_TEXT, payload: response.data.textUpdated });
    }
  } catch (error) {
    console.log(error);
  }
};
