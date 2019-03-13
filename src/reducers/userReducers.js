import { REGISTER_SUCCESS, LOGIN_SUCCESS, LOGOUT } from "../actions/types";

const INTIAL_STATE = {
  isSignedIn: null,
  userId: null,
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
      return { ...state, isSignedIn: false, userId: null };
    default:
      return state;
  }
};
