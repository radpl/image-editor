import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function backgroundsReducer(state = initialState.backgrounds, action) {
  switch (action.type) {
    case types.ADD_BACKGROUND:
      {
        const backgrounds = Object.assign({}, state);
        backgrounds[action.background.id] = { ...action.background };
        return backgrounds;
      }
    case types.DELETE_BACKGROUND:
      {
        const backgrounds = Object.assign({}, state);
        backgrounds[action.background.id] = { ...action.background };
        return backgrounds;
      }
    case types.SAVE_IMAGE_BACKGROUNDS_SUCCESS:
      {
        const backgrounds = [...action.imageBackgrounds];
        return backgrounds;
      }
    case types.SAVE_IMAGE_BACKGROUNDS_REMOTE:
      {
        const backgrounds = [...state, action.background];
        return backgrounds;
      }

    default:
      return state;
  }
}