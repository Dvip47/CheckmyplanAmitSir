import axios from "axios";
import { getCookie } from "../Components/Library/Cookies";
import { DATACONSTANT } from "../constants/data.constant";

// const baseURL = "https://roundpay.net";
const baseURL = DATACONSTANT.BASE_URL;
//const baseURL="https://api.torentx.org:3005/";
const getStoredAuthToken = () => {
  let c = getCookie(DATACONSTANT.SETCOOKIE);
  return !c ? {} : JSON.parse(c)?.token;
  //return localStorage.token;
};

function getHeaders() {
  return {
    accept: "application/json",
    authorization: `Bearer ${getStoredAuthToken()}`,
  };
}

function postHeaders() {
  return {
    "content-type": "application/json",
    authorization: `Bearer ${getStoredAuthToken()}`,
  };
}

export const getRequest = (endpoint, data = null) =>
  axios
    .get(`${baseURL}${endpoint}?${new URLSearchParams(data).toString()}`, {
      headers: getHeaders(),
      mode: "no-cors",
    })
    .then((res) => res.data)
    .catch((err) => {
      console.log(`Error in get request to entpoint ${endpoint}`, err);
      throw err;
    });

export const postRequest = async (endpoint, data = null) => {
  return await axios
    .post(baseURL + endpoint, data, {
      headers: postHeaders(),
      mode: "no-cors",
    })
    .then((res) => res.data)
    .catch((err) => {
      console.log(`Error in post request to entpoint ${endpoint}`, err);
      throw err;
    });
};
