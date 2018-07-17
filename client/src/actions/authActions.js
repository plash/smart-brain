import axios from "axios";
import {
  GET_ERRORS,
  SET_CURRENT_USER_SESSION,
  CLEAR_CURRENT_USER_SESSION
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/register", userData)
    .then(res => {
      // Save to localstorage
      const { token } = res.data;

      // Set token to localstorage
      localStorage.setItem("jwtToken", token);

      // Set token to auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUserSession(decoded));
      history.push("/dashboard");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get user token
export const loginUser = loginData => dispatch => {
  axios
    .post("/api/signin", loginData)
    .then(res => {
      // Save to localstorage
      const { token } = res.data;

      // Set token to localstorage
      localStorage.setItem("jwtToken", token);

      // Set token to auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUserSession(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Set logged in user
export const setCurrentUserSession = decoded => {
  return {
    type: SET_CURRENT_USER_SESSION,
    payload: decoded
  };
};

// Clear current user session
export const clearCurrentUserSession = () => {
  return {
    type: CLEAR_CURRENT_USER_SESSION
  };
};

// Logout user
export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  // Remove auth header
  setAuthToken(false);
  // Set current user to empty
  dispatch(setCurrentUserSession({}));
};
