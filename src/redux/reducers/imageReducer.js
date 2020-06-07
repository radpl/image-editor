import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function imagesReducer(state = initialState.images, action) {
  switch (action.type) {
    case types.SAVE_IMAGES_SUCCESS:
      {
        const images = [...action.images];
        return images;
      }
    default:
      return state;
  }
}