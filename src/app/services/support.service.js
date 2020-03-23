import axios from "axios";

export const ROOT_URL = process.env.REACT_APP_API_URL;
export const SUPPORT_TICKET = "api/supportticket";
export const SUPPORT_TICKET_ATTACHMENT = "attachment";
export const SUPPORT_COMMENT = 'comment'

///api/SupportTicket/Attachment/{SupportTicketCommentId}

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


//attachment

export function saveAttachment(file) {
    return axios.post(`${ROOT_URL}/${SUPPORT_TICKET_ATTACHMENT}`, file);
}

export function getAttachment(id) {
    return axios.get(`${ROOT_URL}/${SUPPORT_TICKET_ATTACHMENT}/${id}`);
}

export function deleteAttachment(id){
    return axios.delete(`${ROOT_URL}/${SUPPORT_TICKET}/${SUPPORT_TICKET_ATTACHMENT}/${id}`)
}


//comment 

export function getCommentById(id) {
    return axios.get(`${ROOT_URL}/${SUPPORT_COMMENT}/${id}`)
}

export function saveComment(comment) {
    return axios.post(`${ROOT_URL}/${SUPPORT_COMMENT}`, comment)
}
