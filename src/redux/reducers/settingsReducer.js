import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function settingsReducer(state = initialState.settings, action) {
  switch (action.type) {
    case types.SELECT_TOOL:
      {
        const settings = Object.assign({}, state);
        settings["tool"] = { ...action.tool };
        return settings;
      }
    default:
      return state;
  }
}