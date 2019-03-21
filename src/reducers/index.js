import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import userReducers from "./userReducers";
import errorReducers from "./errorReducer";
import authorReducers from "./authorReducers";
import storyRootReducers from "./storyRootReducers";

export default combineReducers({
  form: formReducer,
  user: userReducers,
  errors: errorReducers,
  authors: authorReducers,
  storyRoots: storyRootReducers
});
