import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  SELECT_AUTHOR,
  LOGIN_START,
  ONSELECT_AUTHOR,
  LOGIN_FAILED,
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
  isSignedIn: false,
  userId: null,
  isAuthorSelected: false,
  authorId: null,
  error: null,
  message: null,
  authorDetail: null,
  storyRootDetail: null,
  texts: {},
  storyRoots: {}
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return { ...state, message: action.payload };
    case LOGIN_START:
      return { ...state, isSignedIn: null, isAuthorSelected: null };
    case LOGIN_SUCCESS:
      return {
        ...state,
        userId: action.payload._id,
        isSignedIn: true,
        isAuthorSelected: false
      };
    case LOGIN_FAILED:
      return { ...state, isSignedIn: false, isAuthorSelected: false };
    case LOGOUT:
      return {
        ...state,
        isSignedIn: false,
        userId: null,
        isAuthorSelected: false,
        authorId: null
      };
    case SELECT_AUTHOR:
      return { ...state, isAuthorSelected: true, authorId: action.payload };
    case ONSELECT_AUTHOR:
      return { ...state, isAuthorSelected: false, authorId: null };
    case GET_AUTHOR:
      return { ...state, authorDetail: action.payload };
    case SET_STORY_ROOTS_FOR_VISITED_AUTHOR: {
      return { ...state, storyRoots: { ..._.mapKeys(action.payload, "_id") } };
    }
    case FETCH_STORY_ROOT:
      return {
        ...state,
        storyRootDetail: action.payload.root,
        authorDetail: action.payload.author
      };
    case LOAD_TEXT:
      return {
        ...state,
        texts: { ...state.texts, [action.payload._id]: action.payload }
      };

    case UN_SET_AUTHOR:
      return { ...state, authorDetail: null, storyRoots: {} };
    case UN_SET_STORY_ROOT:
      return { ...state, storyRootDetail: null, texts: {} };
    case FOLLOW_SUCCESS:
      return {
        ...state,
        authorDetail: {
          ...state.authorDetail,
          followers: [
            ...state.authorDetail.followers,
            action.payload.selectAuthorId
          ]
        }
      };
    case UN_FOLLOW_SUCCESS:
      return {
        ...state,
        authorDetail: {
          ...state.authorDetail,
          followers: state.authorDetail.followers.filter(
            authorId => authorId !== action.payload.selectAuthorId
          )
        }
      };
    default:
      return state;
  }
};
