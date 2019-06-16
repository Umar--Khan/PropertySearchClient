import { combineReducers } from "redux";
import searchReducer from "./searchReducer";
import userReducer from "./userReducer";
import propertyReducer from "./propertyReducer";

export default combineReducers({
  search: searchReducer,
  user: userReducer,
  property: propertyReducer
});
