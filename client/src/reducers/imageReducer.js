import { GET_FACE_DETECTION_RESPONSE, UPLOAD_IMAGE } from "../actions/types";

const initialState = {
  image: {},
  clarifaiRes: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_IMAGE:
      return {
        ...state,
        image: action.payload
      };
    case GET_FACE_DETECTION_RESPONSE:
      return {
        ...state,
        clarifaiRes: action.payload
      };
    default:
      return state;
  }
}
