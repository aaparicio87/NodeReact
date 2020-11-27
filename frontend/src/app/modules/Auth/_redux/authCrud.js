import axios from "axios";
import url from '../../../../ConfigData'

export const LOGIN_URL = `${url}/signin`;
export const REGISTER_URL = `${url}/signup`;
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password"; 

export const ME_URL = "api/me";

export function login(email, password) {
  return axios.post(LOGIN_URL, { email, password });
}

  export function register(firstName, lastName, roomName, email, password, title, phoneNumber, dateBirth, gender, customer, admin) {
  return axios.post(REGISTER_URL, { firstName, lastName, roomName, email, password, title, phoneNumber, dateBirth, gender, customer, admin });
}

 export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
