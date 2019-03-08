import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import userReducers from "./userReducers";
import errorReducer from "./errorReducer";

export default combineReducers({
  form: formReducer,
  user: userReducers,
  errors: errorReducer
});
