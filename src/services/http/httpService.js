import axios from "axios";
// import { toast } from "react-toastify";
import auth from "../auth/authService";
const url ='https://blog-rest-api-fg6j.onrender.com/'

// const url ='http://127.0.0.1:7000/'

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) console.log("Logging the error", error);
  // toast.error("There was an unexpected error herer");
  return Promise.reject(error);
});

// calling protcted api
function setJwtHeaders() {
  const token =  auth.getJWT();

  return {
    headers: {
      'Content-type':'application/json',
       Authorization: `Bearer ${token}` }
    };
}
export function setURL(){
  return url.concat('api/v1/')
}

export function setFileURL(){
  return url
}


const instance = axios.create({
  baseURL: setURL(),
  headers: {
      'content-type':'application/json',
      "Accept":"application/json",
      Authorization: `Bearer ${auth.getJWT()}`
  },
});
const http  = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setJwtHeaders,
  setURL:setURL(),
  setFileURL:setFileURL(),
  instance:instance,
};
export default http;
