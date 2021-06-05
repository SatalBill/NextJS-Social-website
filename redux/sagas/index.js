import { takeEvery, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actionTypes';

import { signin, signup, forgotPassword } from './auth';

import {
	getAllRoomList,
	getPromotedRoomList,
	getFeaturedRoomList,
	getRoomList,
	createOrUpdateRoom,
	deleteRoom,
	getRoomDetails,
	getRoomUsers,
	followUser,
	getEditAndDeleteRoom,
	addAndUpdateAndDelete,
	joinRoom,
	leaveRoom,
	searchRoomsSaga,
} from './room';
import { getMyFriendsList, getChatroomsList } from './friends';
import {
	getUserList,
	getSpecialUser,
	friendsList,
	myFriendsList,
	getUserProfileById,
	getPhizUserProfile,
} from './users';

export function* watchAuth() {
	yield takeEvery(actionTypes.GET_MY_ROOM_LIST, getRoomList);
	yield takeEvery(actionTypes.GET_ROOMEDITANDDELETE, getEditAndDeleteRoom);
	yield takeEvery(actionTypes.ADD_ROOM, addAndUpdateAndDelete);
	yield takeLatest(actionTypes.GET_USERLIST, getUserList);
	yield takeEvery(actionTypes.GET_SPECIAL_USER, getSpecialUser);
	yield takeEvery(actionTypes.JOIN_ROOM, joinRoom);
	yield takeEvery(actionTypes.LEAVE_ROOM, leaveRoom);
	yield takeEvery(actionTypes.FRIENDS_LIST, friendsList);
	yield takeEvery(actionTypes.GET_USER_DETAILS_BY_ID, getUserProfileById);
	yield takeEvery(actionTypes.GET_MY_FRIENDSLIST, myFriendsList);
	yield takeEvery(actionTypes.GET_PHIZ_USER_PROFILE, getPhizUserProfile);

	// ----------------------------------------------------------------

	// yield takeLatest(actionTypes.GET_ALL_ROOM_LIST, getAllRoomList);
	yield takeEvery(actionTypes.GET_FILTER_ROOMS, searchRoomsSaga);

	//avinay
	yield takeEvery(actionTypes.USER_LOGIN, signin);
	yield takeEvery(actionTypes.USER_REGISTER, signup);
	yield takeEvery(actionTypes.FORGOT_PASSWORD, forgotPassword);

	yield takeLatest(actionTypes.GET_ALL_ROOM_LIST, getAllRoomList);
	yield takeLatest(actionTypes.GET_PROMOTED_ROOM_LIST, getPromotedRoomList);
	yield takeLatest(actionTypes.GET_FEATURED_ROOM_LIST, getFeaturedRoomList);
	yield takeEvery(actionTypes.GET_MY_ROOM_LIST, getRoomList);
	yield takeEvery(actionTypes.CREATE_OR_UPDATE_ROOM, createOrUpdateRoom);
	yield takeEvery(actionTypes.DELETE_ROOM, deleteRoom);
	yield takeEvery(actionTypes.GET_ROOM_DETAILS, getRoomDetails);
	yield takeEvery(actionTypes.GET_ROOM_USERS, getRoomUsers);
	yield takeEvery(actionTypes.FOLLOW_USER, followUser);

	yield takeEvery(actionTypes.GET_MY_FRIENDSLIST, getMyFriendsList);
	yield takeEvery(actionTypes.GET_CHATROOMS_LIST, getChatroomsList);
}
