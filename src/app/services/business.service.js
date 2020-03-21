import axios from "axios";

export const ROOT_URL = process.env.REACT_APP_API_URL;
export const ROOT_BUSINESS = "admin/business";
export const GET_BUSINESS = "admin/business/table";

export function getBusiness() {
  return axios.get(`${ROOT_URL}/${GET_BUSINESS}`);
}

export function getBusinessById(id){
  return axios.get(`${ROOT_URL}/${ROOT_BUSINESS}/${id}`);
}

export function saveBusiness(business) {
  return axios.post(`${ROOT_URL}/${ROOT_BUSINESS}`, business);
}

export function updateBusiness(business) {
  return axios.patch(`${ROOT_URL}/${ROOT_BUSINESS}`,  business);
}

// export function editBusiness(id) {
//   return axios.pat(`${ROOT_URL}/${SAVE_BUSINESS}`, { business });
// }

// export function getUserByToken() {
//   // Authorization head should be fulfilled in interceptor.
//   return axios.get(`${ROOT_URL}/${ME_URL}`);
// }
