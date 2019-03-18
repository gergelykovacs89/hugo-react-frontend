import {
  SET_AUTHORS,
  ADD_AUTHOR_SUCCESS,
  FETCH_AUTHOR,
  EDIT_AUTHOR_SUCCESS,
  DELETE_AUTHOR_SUCCESS,
  LOGOUT,
  FOLLOW_SUCCESS
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
    case FOLLOW_SUCCESS:
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
    default:
      return state;
  }
};
