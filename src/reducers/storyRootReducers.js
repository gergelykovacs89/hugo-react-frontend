import {
  SET_STORY_ROOTS,
  CREATE_STORY_ROOT_SUCCESS,
  EDIT_STORY_ROOT_SUCCESS,
  DELETE_STORY_ROOT_SUCCESS,
  LOGOUT,
  ONSELECT_AUTHOR,
  FETCH_STORY_ROOT_TO_EDIT
} from "../actions/types";
import _ from "lodash";

const INTIAL_STATE = {};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SET_STORY_ROOTS:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case CREATE_STORY_ROOT_SUCCESS:
      return { ...state, [action.payload._id]: action.payload };
    case FETCH_STORY_ROOT_TO_EDIT:
      return { ...state, [action.payload._id]: action.payload };
    case EDIT_STORY_ROOT_SUCCESS:
      return { ...state, [action.payload._id]: action.payload };
    case DELETE_STORY_ROOT_SUCCESS:
      return _.omit(state, action.payload);
    case ONSELECT_AUTHOR:
      return {};
    case LOGOUT:
      return {};
    default:
      return state;
  }
};
