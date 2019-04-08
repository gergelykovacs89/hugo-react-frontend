import { userConstants } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case userConstants.GET_ERRORS:
      return action.payload;
    case userConstants.CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
}
