import * as types from "./actionTypes";
import * as imageApi from "../../api/imageApi";


export function saveImagesSuccess(images) {
  return { type: types.SAVE_IMAGES_SUCCESS, images };
}

export function saveImagesFailed() {
  return { type: types.SAVE_IMAGES_FAILED, image: {} };
}

export function getUserImages(user) {
  return function (dispatch) {
    return imageApi.getUserImages(user)
      .then(result => {
        const imagesWithThumbs = result.filter(item => {
          if (item.thumbnail) {
            return true;
          }
          return false;
        });
        const images = imagesWithThumbs.map(item => {
          const b = new Buffer(item.thumbnail);
          item.thumbnail = "data:image/png[jpg];base64," + b.toString('base64');
          return item;
        })
        dispatch(saveImagesSuccess(images));
      })
      .catch(error => {
        dispatch(saveImagesFailed());
        throw error;
      });
  };
}
