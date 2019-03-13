import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  SELECT_AUTHOR
} from "../actions/types";

const INTIAL_STATE = {
  isSignedIn: null,
  userId: null,
  isAuthorSelected: null,
  authorId: null,
  error: null,
  message: null
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return { ...state, message: action.payload };
    case LOGIN_SUCCESS:
      return {
        ...state,
        userId: action.payload._id,
        isSignedIn: true
      };
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
    default:
      return state;
  }
};
