import { userConstants, authorConstants } from "../actions/types";
import _ from "lodash";

const INTIAL_STATE = {};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case userConstants.SET_AUTHORS:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case authorConstants.ADD_AUTHOR_SUCCESS:
      return { ...state, [action.payload._id]: action.payload };
    case authorConstants.FETCH_AUTHOR:
      return { ...state, [action.payload._id]: action.payload };
    case authorConstants.EDIT_AUTHOR_SUCCESS:
      return { ...state, [action.payload._id]: action.payload };
    case authorConstants.DELETE_AUTHOR_SUCCESS:
      return _.omit(state, action.payload);
    case userConstants.LOGOUT:
      return {};
    case authorConstants.FOLLOW_SUCCESS:
      return {
        ...state,
        [action.payload.selectAuthorId]: {
          ...state[action.payload.selectAuthorId],
          following: [
            ...state[action.payload.selectAuthorId].following,
            action.payload.authorToFollowId
          ]
        }
      };
    case authorConstants.UN_FOLLOW_SUCCESS:
      return {
        ...state,
        [action.payload.selectAuthorId]: {
          ...state[action.payload.selectAuthorId],
          following: state[action.payload.selectAuthorId].following.filter(
            authorId => authorId !== action.payload.authorToUnFollowId
          )
        }
      };
    default:
      return state;
  }
};
