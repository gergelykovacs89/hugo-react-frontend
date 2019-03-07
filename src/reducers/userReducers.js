import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  CLEAR_ALERTS
} from "../actions/types";

const INTIAL_STATE = {
  isSignedIn: null,
  userId: null,
  error: null,
  message: null
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case REGISTER_FAIL:
      return { ...state, error: action.payload.err };
    case REGISTER_SUCCESS:
      return { ...state, message: action.payload };
    case CLEAR_ALERTS:
      return { ...state, error: null, message: null };
    default:
      return state;
  }
};
