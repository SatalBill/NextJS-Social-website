import axios from "axios"
import { call, put } from "redux-saga/effects"
import * as actionTypes from "../actionTypes";
import * as userRequest from "./Requests/userRequest";
import * as userAction from "../actions/users";
import {
    getUserListFail,
    getSpecialUserSuccess,
    getSpecialUserFail,
} from "../actions/users"
import Config from "../../config"
let apiPrefix = "/api/v1/userRelation"
export function* getFollowingList(payload) {
    try {
        const res = yield call(userRequest.getFollowingList, payload)
        if (res.status === 200) {
            let response = res.data.data
            yield put(userAction.getUserListSuccess(response))
        }


    } catch (error) {
        let errorMsg = "GetUserList failed."
        if (error.response && error.response.status === 400) {
            errorMsg = error.response.data
        }
        yield put(userAction.getUserListFail(errorMsg))
    }
}


// export function* getUserProfileById(action) {
//     try {
//       const resp = yield axios.post(`${Config.serverURL}/api/v1/room/getRoomList`);
//       yield put(getRoomListSuccess(resp.data.data));
//     } catch (error) {
//       // console.log("GetRoomList Error: ", error.response.data);

//       let errorMsg = "GetRoomList failed.";
//       if (error.response.status === 400) {
//         errorMsg = error.response.data;
//       }

//       yield put(getRoomListFail(errorMsg));
//     }
//   }


export function* getPhizUserProfile(action) {
    try {
        const res = yield axios.get(Config.serverURL + `/api/v1/user/getUserProfileById/${action.id}`, Config.requestHeaders)
        if (res.status === 200) {
            let response = res.data.data
            yield put({
                type: actionTypes.GET_PHIZ_USER_PROFILE_SCCESS,
                payload: response
            })
        }
    } catch (error) {
        let errorMsg = "Profile failed."
        if (error.response && error.response.status === 400) {
            errorMsg = error.response.data
        }
        yield put(userAction.getUserListFail(errorMsg))
    }
}

export function* getUserProfileById(action) {
    try {

        const res = yield axios.get(Config.serverURL + `/api/v1/user/getUserProfileById/${action.id}`, Config.requestHeaders)
        if (res.status === 200) {
            let response = res.data.data
            response.socketId = Config.socket.id
            yield put({
                type: actionTypes.GET_MY_PROFILE,
                payload: response
            })
        }
    } catch (error) {
        let errorMsg = "Profile failed."
        if (error.response && error.response.status === 400) {
            errorMsg = error.response.data
        }
        yield put(userAction.getUserListFail(errorMsg))
    }
}

export function* myFriendsList(action) {
    let apiURL = Config.serverURL + apiPrefix + '/getUserFriends'
    try {
        const res = yield axios.get(apiURL, Config.requestHeaders)
        if (res.status === 200) {
            let response = res.data.data
            yield put(userAction.getMyFriendListSuccess(response))
        }
    } catch (error) {
        let errorMsg = "Friends list failed."
        if (error.response && error.response.status === 400) {
            errorMsg = error.response.data
        }
        yield put(userAction.getMyFriendListFail(errorMsg))
    }

}
export function friendsList(action) {
    let url = `${Config.serverURL}/api/v1/userRelation/getUserFriends`
    axios.get(url).then(res => {
        return {
            type: actionTypes.GET_FRIENDSLIST_SUCCESS,
            payload: res
        }
    })
}

export function* getUserList(payload) {
    try {
        const res = yield call(userRequest.getUserList, payload)
        if (res.status === 200) {
            let response = res.data.data
            yield put(userAction.getUserListSuccess(response))
        }


    } catch (error) {
        let errorMsg = "GetUserList failed."
        if (error.response && error.response.status === 400) {
            errorMsg = error.response.data
        }
        yield put(userAction.getUserListFail(errorMsg))
    }
}



export function* getSpecialUser(action) {
    try {
        const resp = yield axios.post(
            `${Config.serverURL}TUser/getSpecialUser`,
            { localId: action.localId, remoteId: action.remoteId }
        )
        yield put(getSpecialUserSuccess(resp.data))
    } catch (error) {
        console.log("GetSpecialUser Error: ", error.response.data)

        let errorMsg = "GetSpecialUser failed."
        if (error.response.status === 400) {
            errorMsg = error.response.data
        }

        yield put(getSpecialUserFail(errorMsg))
    }
}
