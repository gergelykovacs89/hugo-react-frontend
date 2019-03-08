import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  SET_AUTHORS,
  LOGOUT
} from "../actions/types";

const INTIAL_STATE = {
  isSignedIn: null,
  userId: null,
  error: null,
  message: null,
  authors: []
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
    case SET_AUTHORS:
      return {
        ...state,
        authors: action.payload
      };
    case LOGOUT:
      return { ...state, isSignedIn: false, userId: null, authors: [] };
    default:
      return state;
  }
};
