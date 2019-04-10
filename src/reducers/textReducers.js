import {
  userConstants,
  authorConstants,
  textConstants
} from "../actions/types";
import _ from "lodash";

const INTIAL_STATE = {};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case textConstants.SET_TEXTS:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case textConstants.ADD_TEXT:
      return { ...state, [action.payload._id]: action.payload };
    case textConstants.EDIT_TEXT:
      return { ...state, [action.payload._id]: action.payload };
    case textConstants.DELETE_TEXT:
      return _.omit(state, action.payload);
    case authorConstants.ONSELECT_AUTHOR:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  }
};
