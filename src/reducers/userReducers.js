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
  UN_FOLLOW_SUCCESS
} from "../actions/types";

const INTIAL_STATE = {
  isSignedIn: false,
  userId: null,
  isAuthorSelected: false,
  authorId: null,
  error: null,
  message: null,
  authorDetail: null
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
