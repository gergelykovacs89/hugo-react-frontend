import { createStore } from 'redux';
import reducers from "./reducers"


const store = (window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()(createStore)
  : createStore)(reducers);

export default store;