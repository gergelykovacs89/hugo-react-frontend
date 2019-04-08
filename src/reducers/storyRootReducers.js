import { userConstants, authorConstants, storyRootConstants } from "../actions/types";
import _ from "lodash";

const INTIAL_STATE = {};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case storyRootConstants.SET_STORY_ROOTS:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case storyRootConstants.CREATE_STORY_ROOT_SUCCESS:
      return { ...state, [action.payload._id]: action.payload };
    case storyRootConstants.FETCH_STORY_ROOT_TO_EDIT:
      return { ...state, [action.payload._id]: action.payload };
    case storyRootConstants.EDIT_STORY_ROOT_SUCCESS:
      return { ...state, [action.payload._id]: action.payload };
    case storyRootConstants.DELETE_STORY_ROOT_SUCCESS:
      return _.omit(state, action.payload);
    case authorConstants.ONSELECT_AUTHOR:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  }
};
