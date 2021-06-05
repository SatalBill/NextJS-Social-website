import axios from "axios";
import config from "../../../config";
let requestHeaders = config.requestHeaders

export const getChatList = () => {
    let url = `${config.serverURL}/api/v1/chat/getUserChats`
    return axios.get(url, requestHeaders)
}
export const getRoomMessages = (roomId) => {
    let url = `${config.serverURL}/api/v1/chat/getRoomMessages?roomId=${roomId}`
    return axios.get(url, requestHeaders)
}


