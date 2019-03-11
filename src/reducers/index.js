import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import userReducers from "./userReducers";
import errorReducers from "./errorReducer";
import authorReducers from "./authorReducers";

export default combineReducers({
  form: formReducer,
  user: userReducers,
  errors: errorReducers,
  authors: authorReducers
});
