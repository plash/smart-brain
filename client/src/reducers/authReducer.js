import {
  SET_CURRENT_USER_SESSION,
  CLEAR_CURRENT_USER_SESSION
} from "../actions/types";
import isEmpty from "../validations/is-empty";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER_SESSION:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case CLEAR_CURRENT_USER_SESSION:
      return state;
    default:
      return state;
  }
}
