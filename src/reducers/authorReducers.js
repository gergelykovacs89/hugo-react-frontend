import {
  SET_AUTHORS,
  ADD_AUTHOR_SUCCESS,
  FETCH_AUTHOR,
  EDIT_AUTHOR_SUCCESS,
  DELETE_AUTHOR_SUCCESS,
  LOGOUT
} from "../actions/types";
import _ from "lodash";

const INTIAL_STATE = {};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SET_AUTHORS:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case ADD_AUTHOR_SUCCESS:
      return { ...state, [action.payload._id]: action.payload };
    case FETCH_AUTHOR:
      return { ...state, [action.payload._id]: action.payload };
    case EDIT_AUTHOR_SUCCESS:
      return { ...state, [action.payload._id]: action.payload };
    case DELETE_AUTHOR_SUCCESS:
      return _.omit(state, action.payload);
    case LOGOUT:
      return {};
    default:
      return state;
  }
};
