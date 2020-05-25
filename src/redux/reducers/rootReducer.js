import { combineReducers } from "redux";
import logos from "./logosReducer";
import texts from "./textsReducer";
import background from "./backgroundReducer"
import editor from "./editorReducer";
import user from "./userReducer";

//import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  logos,
  texts,
  background,
  editor,
  user,
  //apiCallsInProgress
});

export default rootReducer;