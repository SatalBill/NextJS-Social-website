import axios from "axios";
import config from "../../../config";
let requestHeaders = config.requestHeaders

export const login = (authData) => {
    return axios.post(`${config.serverURL}/api/v1/auth/login`, authData).catch(e => {
        return e
    })
}

export const updateProfile = (payload) => {
     let url = `${config.serverURL}/api/v1/user/updateUserProfile`
    return axios.patch(url,payload,requestHeaders)
}
export const getUserList = (payload) => {
    let search = payload.payload && payload.payload.search || ""
    let url = `${config.serverURL}/api/v1/search/searchUser?searchTerm=${search}`
    return axios.get(url, requestHeaders)
}

export const getProfile = (payload) => {
    let search = payload.payload && payload.payload.search || ""
    let url = `${config.serverURL}/api/v1/search/searchUser?searchTerm=${search}`

    return axios.get(url, requestHeaders)
}
export const rejectRequest = (payload) => {
    let search = payload.payload && payload.payload.search || ""
    let url = `${config.serverURL}/api/v1/search/searchUser?searchTerm=${search}`
    return axios.get(url, requestHeaders)
}


export const getFollowingList = (payload) => {
    let url = `${config.serverURL}/api/v1/userRelation/getUserFollowings`
    return axios.get(url, requestHeaders, payload)
}

export const unfollowUser = (payload) => {
    let header = { data: payload, ...requestHeaders }
    let url = `${config.serverURL}/api/v1/userRelation/unFollowUser`
    return axios.delete(url, header)
}
export const followUser = (payload) => {
    let url = `${config.serverURL}/api/v1/userRelation/followUser`
    return axios.post(url, payload, requestHeaders)
}


//------------- Followers

export const getFollowersList = (payload) => {
    let url = `${config.serverURL}/api/v1/userRelation/getUserFollowers`
    return axios.get(url, requestHeaders, payload).catch(e => {
        return e
    })
}

//------------- Firends
export const getFriendsList = (payload) => {
    let url = `${config.serverURL}/api/v1/userRelation/getUserFriends`
    return axios.get(url, requestHeaders).catch(e => {
        return e
    })
}
export const sendFriendRequest = (payload) => {
     let url = `${config.serverURL}/api/v1/userRelation/sendFriendRequest`
    return axios.post(url, payload, requestHeaders)
}

export const unfriendUser = (payload) => {
    let header = { data: payload, ...requestHeaders }

    let url = `${config.serverURL}/api/v1/userRelation/unfriendUser`
    return axios.delete(url, header)
}
//------------- Friend Request
export const getFriendRequest = (payload) => {
    let url = `${config.serverURL}/api/v1/userRelation/getPendingRequests`
    return axios.get(url, requestHeaders, payload)
}

export const approveRequest = (payload) => {
    let url = `${config.serverURL}/api/v1/userRelation/approveRequest`
    return axios.patch(url, payload, requestHeaders)
}
export const cancelFriendRequest = (payload) => {
    let url = `${config.serverURL}/api/v1/userRelation/cancelRequest`
    return axios.post(url, payload, requestHeaders)
}


//------------- Invites
export const getInviteList = (payload) => {
    let url = `${config.serverURL}/api/v1/userRelation/getInvite`
    return axios.get(url, requestHeaders, payload)
}
export const rejectInvite = (payload) => {
    let url = `${config.serverURL}/api/v1/userRelation/rejectInvite`
    return axios.get(url, requestHeaders, payload)
}




