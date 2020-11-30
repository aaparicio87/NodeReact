import axios from "axios";
import url from '../../../../ConfigData'

export const LOGIN_URL = `${url}/signin`;
export const REGISTER_URL = `${url}/signup`;
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password"; 

export const ME_URL = "api/me";

export function login(email, password) {
  return axios.post(LOGIN_URL, { email, password });
}

  export function register_provider(title, firstName, lastName, roomName, 
    email, password, customer, admin) {
    const user={
      title: title,
      firstName: firstName,
      lastName: lastName,
      roomName: roomName,
      email: email,
      password: password,
      customer: customer,
      admin: admin,
    }

    return axios.post(REGISTER_URL, user)
          .then(res => {
            console.log('response', res.data);
          })
          .catch(err=>{
            console.log('error', err);
          });
}

  export function register_customer(firstName, lastName, email, password,
     phoneNumber, dateBirth, gender, customer, admin) {
    const user={
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      customer: customer,
      admin: admin,
      phoneNumber: phoneNumber,
      dateBirth: dateBirth,
      gender: gender
  }
  
    return axios.post(REGISTER_URL, user)
        .then(res => {
          console.log('response', res.data);
        })
        .catch(err=>{
          console.log('error', err);
        });
  }

export function register_admin(firstName, lastName, email, password, customer, admin) {
  const user={
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    admin: admin,
    customer: customer,
}

  return axios.post(REGISTER_URL, user)
          .then(res => {
            console.log('response', res.data);
          })
          .catch(err=>{
            console.log('error', err);
          });
}

export function requestPassword(email) {
return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
