import { REGISTER_SUCCESS } from "../actions/types";

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
    default:
      return state;
  }
};
