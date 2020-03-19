import axios from "axios";

export const ROOT_URL = "https://thecrmnetwork20200225035915.azurewebsites.net";
export const ROOT_USER = "admin/user";

export function getUserAdmin() {
    return axios.get(`${ROOT_URL}/${ROOT_USER}/masteradmin`);
}

export function getUserAdminById(id) {
    return axios.get(`${ROOT_URL}/${ROOT_USER}/masteradmin/${id}`);
}

export function saveUserAdmin(user) {
    return axios.post(`${ROOT_URL}/${ROOT_USER}/masteradmin`, user);
}

export function updateUserAdmin(user) {
    return axios.patch(`${ROOT_URL}/${ROOT_USER}/masteradmin`, user);
}

export function deleteUserAdmin(id){
    return axios.delete(`${ROOT_URL}/${ROOT_USER}/masteradmin/${id}`);
}