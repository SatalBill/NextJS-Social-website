import * as actionTypes from "../actionTypes";

export const getMyFriendListSuccess = myFriendsList => {
  return {
    type: actionTypes.GET_MY_FRIENDSLIST_SUCCESS,
    payload: myFriendsList,
  };
};

export const getMyFriendListFail = payload => {
  return {
    type: actionTypes.GET_MY_FRIENDSLIST_FAIL,
    payload,
  };
};

export const getFollowingListSuccess = followingList => {
  return {
    type: actionTypes.GET_FOLLOWER_LIST_SUCCESS,
    followingList,
  };
};
export const getFollowerListSuccess = followerList => {
  return {
    type: actionTypes.GET_FOLLOWER_LIST_SUCCESS,
    followerList,
  };
};

export const getFriendsList = friendsList => {
  return {
    type: actionTypes.GET_FRIENDSLIST_SUCCESS,
    friendsList,
  };
};

export const getUserProfile = id => {
  // return  {
  //    type: actionTypes.GET_USER_DETAILS_BY_ID,
  //    id,
  // }
};

export const getUserList = () => {
  return {
    type: actionTypes.GET_USERLIST,
  };
};

export const getUserListSuccess = userList => {
  return {
    type: actionTypes.GET_USERLIST_SUCCESS,
    userList,
  };
};

export const getUserListFail = error => {
  return {
    type: actionTypes.GET_USERLIST_FAIL,
    error,
  };
};

export const getSpecialUser = (localId, remoteId) => {
  return {
    type: actionTypes.GET_SPECIAL_USER,
    localId,
    remoteId,
  };
};

export const getSpecialUserSuccess = specialUser => {
  return {
    type: actionTypes.GET_SPECIAL_USER_SUCCESS,
    specialUser,
  };
};

export const getSpecialUserFail = error => {
  return {
    type: actionTypes.GET_SPECIAL_USER_FAIL,
    error,
  };
};
