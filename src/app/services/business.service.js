import axios from "axios";

export const ROOT_URL = "https://thecrmnetwork20200225035915.azurewebsites.net";
export const GET_BUSINESS = "api/business";

export function getBusiness() {
  return axios.get(`${ROOT_URL}/${GET_BUSINESS}`);
}

// export function getUserByToken() {
//   // Authorization head should be fulfilled in interceptor.
//   return axios.get(`${ROOT_URL}/${ME_URL}`);
// }
