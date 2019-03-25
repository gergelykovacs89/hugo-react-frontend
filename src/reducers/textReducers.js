import {
  SET_TEXTS,
  ADD_TEXT,
  EDIT_TEXT,
  DELETE_TEXT,
  LOGOUT,
  ONSELECT_AUTHOR,
  FETCH_STORY_ROOT
} from "../actions/types";
import _ from "lodash";

const INTIAL_STATE = {};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SET_TEXTS:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case ADD_TEXT:
      return { ...state, [action.payload._id]: action.payload };
    case FETCH_STORY_ROOT:
      return { ...state, [action.payload.rootText._id]: action.payload.rootText };
    case EDIT_TEXT:
      return { ...state, [action.payload._id]: action.payload };
    case DELETE_TEXT:
      return _.omit(state, action.payload);
    case ONSELECT_AUTHOR:
      return {};
    case LOGOUT:
      return {};
    default:
      return state;
  }
};
