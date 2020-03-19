import axios from "axios";

export const ROOT_URL = "https://thecrmnetwork20200225035915.azurewebsites.net";
export const ROOT_USER = "admin/user";
export const GET_BUSINESS = "admin/business/table";


export function getUserAdmin() {
    return axios.get(`${ROOT_URL}/${ROOT_USER}/masteradmin`);
}

export function saveUserAdmin(user) {
    return axios.post(`${ROOT_URL}/${ROOT_USER}/masteradmin`, user);
}
