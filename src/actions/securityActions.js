import axios from "axios";
import { GET_ERRORS, GET_CURRENT_USER } from "./types";

import setJwtToken from "../securityUtils/setJwtToken";
import jwt_decode from "jwt-decode";

export const createNewUser = (newUser, history) => async dispatch => {
  try {
    await axios.post("/api/users/register", newUser);
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
    history.push("/login");
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const login = LoginRequest => async dispatch => {
  try {
    const res = await axios.post("/api/users/login", LoginRequest);
    const { token } = res.data;
    localStorage.setItem("jwtToken", token);
    setJwtToken(token);
    const decoded = jwt_decode(token);
    dispatch({
      type: GET_CURRENT_USER,
      payload: decoded
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setJwtToken(false);
  dispatch({
    type: GET_CURRENT_USER,
    payload: {}
  });
};
