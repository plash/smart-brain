import axios from "axios";
import { GET_ERRORS, UPLOAD_IMAGE, GET_FACE_DETECTION_RESPONSE } from "./types";

// Save Image to DB
export const postImage = imageData => dispatch => {
  axios
    .post("/api/image", imageData)
    .then(res => {
      dispatch({
        type: UPLOAD_IMAGE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// POST Image to Clarifai
export const postClarifai = imageData => (dispatch, getState) => {
  axios
    .post("/api/imageurl", imageData)
    .then(res => {
      dispatch({
        type: GET_FACE_DETECTION_RESPONSE,
        payload: res.data
      });
      const newImageData = {
        url: imageData.url,
        user: getState().auth.user.id
      };

      dispatch(postImage(newImageData));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const postFileClarifai = imageData => (dispatch, getState) => {
  axios
    .post("/api/imageFile", imageData)
    .then(res => {
      dispatch({
        type: GET_FACE_DETECTION_RESPONSE,
        payload: res.data
      });
      const newImageData = {
        url: imageData.name,
        user: getState().auth.user.id
      };

      dispatch(postImage(newImageData));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
