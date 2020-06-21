import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function backgroundsReducer(state = initialState.backgrounds, action) {
  switch (action.type) {
    case types.SAVE_IMAGE_BACKGROUNDS_SUCCESS:
      {
        const backgrounds = Object.assign({}, state, { backgrounds: [...action.imageBackgrounds] });
        //const backgrounds = [...action.imageBackgrounds];
        return backgrounds;
      }
    case types.SAVE_IMAGE_BACKGROUNDS_REMOTE:
      {
        const backgrounds = Object.assign({}, state, { backgrounds: [...state.backgrounds, action.background] });
        //const backgrounds = [...state, action.background];
        return backgrounds;
      }
    case types.SELECTED_BACKGROUND:
      {
        const backgrounds = Object.assign({}, state, { selected: action.selected });
        return backgrounds;
      }

    default:
      return state;
  }
}