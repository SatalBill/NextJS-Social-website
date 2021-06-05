import axios from "axios";
import config from "../../../config";
let requestHeaders = config.requestHeaders

export const uploadFiles= (arg) => {
    let url = `${config.serverURL}/phiz/upload_files`
    return axios.post(url,arg, requestHeaders)
} 


