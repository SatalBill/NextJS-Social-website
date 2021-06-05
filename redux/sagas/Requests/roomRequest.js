import axios from "axios";
import config from "../../../config";
let requestHeaders = config.requestHeaders

export const getRoomDetails = (roomId) => {
    let url = `${config.serverURL}/api/v1/room/getRoomDetails/${roomId}`;
    return axios.get(url, requestHeaders)
}
export const getRoomMessages = (roomId) => {
    let url = `${config.serverURL}/api/v1/room/getRoomMessages/${roomId}`
    return axios.get(url, requestHeaders)
}




