import {
  LOGOUT,
  GET_AUTHOR,
  FOLLOW_SUCCESS,
  UN_FOLLOW_SUCCESS,
  UN_SET_AUTHOR,
  UN_SET_STORY_ROOT,
  FETCH_STORY_ROOT,
  LOAD_TEXT,
  SET_STORY_ROOTS_FOR_VISITED_AUTHOR
} from "../actions/types";
import _ from "lodash";

const INTIAL_STATE = {
  currentlyVisitedAuthorDetail: null,
  currentlyVisitedAuthorStoryRoots: {},
  currentlyVisitedAuthorTexts: {},
  currentlyVisitedStoryRootDetail: null,
  currentlyVisitedStoryRootTexts: {}
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case LOGOUT:
      return {
        ...state,
        currentlyVisitedAuthorDetail: null,
        currentlyVisitedAuthorStoryRoots: {},
        currentlyVisitedAuthorTexts: {},
        currentlyVisitedStoryRootDetail: null,
        currentlyVisitedStoryRootTexts: {}
      };
    case GET_AUTHOR:
      return { ...state, currentlyVisitedAuthorDetail: action.payload };
    case SET_STORY_ROOTS_FOR_VISITED_AUTHOR: {
      return { ...state, currentlyVisitedAuthorStoryRoots: { ..._.mapKeys(action.payload, "_id") } };
    }
    case FETCH_STORY_ROOT:
      return {
        ...state,
        currentlyVisitedStoryRootDetail: action.payload.root,
        currentlyVisitedAuthorDetail: action.payload.author
      };
    case LOAD_TEXT:
      return {
        ...state,
        currentlyVisitedStoryRootTexts: { ...state.currentlyVisitedStoryRootTexts, [action.payload._id]: action.payload }
      };

    case UN_SET_AUTHOR:
      return { ...state, currentlyVisitedAuthorDetail: null, currentlyVisitedAuthorStoryRoots: {} };
    case UN_SET_STORY_ROOT:
      return { ...state, currentlyVisitedStoryRootDetail: null, currentlyVisitedStoryRootTexts: {} };
    case FOLLOW_SUCCESS:
      return {
        ...state,
        currentlyVisitedAuthorDetail: {
          ...state.currentlyVisitedAuthorDetail,
          followers: [
            ...state.currentlyVisitedAuthorDetail.followers,
            action.payload.selectAuthorId
          ]
        }
      };
    case UN_FOLLOW_SUCCESS:
      return {
        ...state,
        currentlyVisitedAuthorDetail: {
          ...state.currentlyVisitedAuthorDetail,
          followers: state.currentlyVisitedAuthorDetail.followers.filter(
            authorId => authorId !== action.payload.selectAuthorId
          )
        }
      };
    default:
      return state;
  }
};
