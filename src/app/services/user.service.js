import axios from "axios";

export const ROOT_URL = process.env.REACT_APP_API_URL;
export const LOGIN_URL = "auth";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";
export const ME_URL = "api/user";

export function login(email, password) {
  return axios.post(`${ROOT_URL}/${LOGIN_URL}`, { email, password });
}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(`${ROOT_URL}/${ME_URL}`);
}
