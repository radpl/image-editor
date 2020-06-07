import { combineReducers } from "redux";
import logos from "./logosReducer";
import texts from "./textsReducer";
import backgrounds from "./backgroundReducer"
import editor from "./editorReducer";
import user from "./userReducer";
import color from './colorReducer';
import settings from "./settingsReducer";
import images from "./imageReducer";


//import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  logos,
  texts,
  backgrounds,
  editor,
  user,
  color,
  settings,
  images,
  //apiCallsInProgress
});

export default rootReducer;