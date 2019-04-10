import textApi from "../apis/text";
import { textConstants } from "./types";
import setAuthToken from "../helpers/setAuthToken";

export const fetchText = textId => async (dispatch, getState) => {
  try {
    setAuthToken(localStorage.getItem("jwtToken"));
    const response = await textApi.get(`/${textId}`);
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

export const updateText = (newTextState, textId) => async dispatch => {
  try {
    const response = await textApi.put(`/update/${textId}`, { newTextState });
    dispatch({
      type: textConstants.EDIT_TEXT,
      payload: response.data.textUpdated
    });
    dispatch({
      type: textConstants.UPDATE_TEXT,
      payload: response.data.textUpdated
    });
  } catch (error) {
    console.log(error);
  }
};

export const forkText = (text, _parentTextId, _authorId) => async (
  dispatch,
  getState
) => {
  try {
    const response = await textApi.post(`/fork`, {
      text,
      _parentTextId,
      _authorId
    });

    dispatch({
      type: textConstants.ADD_TEXT,
      payload: response.data.childText
    });
    dispatch({
      type: textConstants.LOAD_TEXT,
      payload: response.data.childText
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTextById = (textId, parentId) => async (
  dispatch,
  getState
) => {
  try {
    await textApi.delete(`/delete/${textId}`);
    dispatch({
      type: textConstants.DELETE_TEXT,
      payload: textId
    });
    dispatch({
      type: textConstants.UNLOAD_TEXT,
      payload: { textId, parentId }
    });
  } catch (error) {
    console.log(error);
  }
};
