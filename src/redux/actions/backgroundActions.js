import * as types from "./actionTypes";
import * as imageApi from "../../api/imageApi";

export function saveBackgroundSuccess(image) {
  return { type: types.SAVE_BACKGROUND_SUCCESS, image };
}

export function saveBackgroundFailed() {
  return { type: types.SAVE_BACKGROUND_FAILED, image: {} };
}

export function saveImageBackgroundsSuccess(imageBackgrounds) {
  return { type: types.SAVE_IMAGE_BACKGROUNDS_SUCCESS, imageBackgrounds };
}

export function saveImageBackgroundsRemote(background) {
  return { type: types.SAVE_IMAGE_BACKGROUNDS_REMOTE, background };
}

export function saveImageBackgroundsFailed() {
  return { type: types.SAVE_IMAGE_BACKGROUNDS_FAILED, imageBackgrounds: [] };
}

export function clearImageBackgrounds() {
  return { type: types.CLEAR_IMAGE_BACKGROUNDS, imageBackgrounds: [] };
}
export function selectedBackground(id) {
  return { type: types.SELECTED_BACKGROUND, selected: id }
}

export function saveBackgrounds(background) {
  return function (dispatch) {
    return imageApi.saveBackgrounds(background)
      .then(ok => {
        dispatch(saveBackgroundSuccess({ ...ok }));
      })
      .catch(error => {
        dispatch(saveBackgroundFailed());
        throw error;
      });
  };
}

export function getImageBackgrounds(imageId) {
  return function (dispatch) {
    return imageApi.getImageBackgroundsApi(imageId)
      .then(result => {
        dispatch(saveImageBackgroundsSuccess(result));
      })
      .catch(error => {
        dispatch(saveImageBackgroundsFailed());
        throw error;
      });
  };
}