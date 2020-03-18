import axios from "axios";

export const ROOT_URL = "https://thecrmnetwork20200225035915.azurewebsites.net";
export const GET_BUSINESS = "admin/business/table";
export const SAVE_BUSINESS = "admin/business";

export function getBusiness() {
  return axios.get(`${ROOT_URL}/${GET_BUSINESS}`);
}

export function saveBusiness(business) {
  return axios.get(`${ROOT_URL}/${SAVE_BUSINESS}`, { business });
}

// export function getUserByToken() {
//   // Authorization head should be fulfilled in interceptor.
//   return axios.get(`${ROOT_URL}/${ME_URL}`);
// }
