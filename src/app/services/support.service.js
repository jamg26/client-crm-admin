import axios from "axios";

export const ROOT_URL = process.env.REACT_APP_API_URL;
export const SUPPORT_TICKET = "api/supportticket";
export const SUPPORT_TICKET_ATTACHMENT = "attachment";

export function getAllSupportTicket(){
    return axios.get(`${ROOT_URL}/${SUPPORT_TICKET}`);
}

export function getOpenSupportTicket(){
    return axios.get(`${ROOT_URL}/${SUPPORT_TICKET}/active`);
}

export function getClosedSupportTicket(){
    return axios.get(`${ROOT_URL}/${SUPPORT_TICKET}/closed`);
}

export function getTicketById(id){
    return axios.get(`${ROOT_URL}/${SUPPORT_TICKET}/${id}`);
}

export function saveAttachment(file) {
    return axios.post(`${ROOT_URL}/${SUPPORT_TICKET_ATTACHMENT}`, file);
}

// export function getBusiness() {
//   return axios.get(`${ROOT_URL}/${GET_BUSINESS}`);
// }

// export function getBusinessById(id){
//   return axios.get(`${ROOT_URL}/${ROOT_BUSINESS}/${id}`);
// }

// export function saveBusiness(business) {
//   return axios.post(`${ROOT_URL}/${ROOT_BUSINESS}`, business);
// }

// export function updateBusiness(business) {
//   return axios.patch(`${ROOT_URL}/${ROOT_BUSINESS}`,  business);
// }

// export function editBusiness(id) {
//   return axios.pat(`${ROOT_URL}/${SAVE_BUSINESS}`, { business });
// }

// export function getUserByToken() {
//   // Authorization head should be fulfilled in interceptor.
//   return axios.get(`${ROOT_URL}/${ME_URL}`);
// }
