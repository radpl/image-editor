import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function logosReducer(state = initialState.logos, action) {
  switch (action.type) {
    case types.ADD_LOGO:
      {
        const logos = Object.assign({}, state);
        logos[action.logo.id] = { ...action.logo };
        return logos;
      }
    case types.DELETE_LOGO:
      {
        const logos = Object.assign({}, state);
        logos[action.logo.id] = { ...action.logo };
        return logos;
      }
    case types.SAVE_IMAGE_LOGOS_SUCCESS:
      {
        const logos = Object.assign({}, state);
        logos['logoImages'] = [...action.logoImages];
        return logos;
      }
    case types.SAVE_IMAGE_LOGOS_REMOTE:
      {
        const logos = Object.assign({}, state);
        const logoImages = logos['logoImages'] || [];
        logos['logoImages'] = [...logoImages, action.logos];
        return logos;
      }
    default:
      return state;
  }
}