import {
  userConstants, authorConstants
} from "../actions/types";

const INTIAL_STATE = {
  isSignedIn: false,
  userId: null,
  isAuthorSelected: false,
  authorId: null,
  error: null,
  message: null
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case userConstants.REGISTER_SUCCESS:
      return { ...state, message: action.payload };
    case userConstants.LOGIN_START:
      return { ...state, isSignedIn: null, isAuthorSelected: null };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        userId: action.payload._id,
        isSignedIn: true,
        isAuthorSelected: false
      };
    case userConstants.LOGIN_FAILED:
      return { ...state, isSignedIn: false, isAuthorSelected: false };
    case userConstants.LOGOUT:
      return {
        ...state,
        isSignedIn: false,
        userId: null,
        isAuthorSelected: false,
        authorId: null
      };
    case authorConstants.SELECT_AUTHOR:
      return { ...state, isAuthorSelected: true, authorId: action.payload };
    case authorConstants.ONSELECT_AUTHOR:
      return { ...state, isAuthorSelected: false, authorId: null };
    default:
      return state;
  }
};
