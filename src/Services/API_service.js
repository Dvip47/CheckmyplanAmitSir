import axios from "axios";
import { getCookie } from "./Cookies";
import { DATACONSTANT } from "../constants/data.constant";

const baseURL = DATACONSTANT.BASE_URL;
const getStoredAuthToken = () => {
  let c = getCookie(DATACONSTANT.SETCOOKIE);
  return !c ? {} : JSON.parse(c)?.token;
};

function getHeaders() {
  return {
    accept: "application/json",
    //authorization: `Bearer ${getStoredAuthToken()}`,
  };
}

function postHeaders() {
  return {
    "content-type": "application/json",
    //authorization: `Bearer ${getStoredAuthToken()}`,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
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
      console.log(`Error in post request to endpoint ${endpoint}`, err);
      throw err;
    });
};
