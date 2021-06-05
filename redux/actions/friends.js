import {
	GET_MY_FRIENDSLIST,
	GET_MY_FRIENDSLIST_SUCCESS,
	GET_MY_FRIENDSLIST_FAILURE,
	GET_CHATROOMS_LIST,
	GET_CHATROOMS_LIST_SUCCESS,
	GET_CHATROOMS_LIST_FAILURE,
} from '../actionTypes';

export const getMyFriendList = (token) => {
	return {
		type: GET_MY_FRIENDSLIST,
		token,
	};
};
export const getMyFriendListSuccess = (response) => {
	return {
		type: GET_MY_FRIENDSLIST_SUCCESS,
		response,
	};
};
export const getMyFriendListFailure = (error) => {
	return {
		type: GET_MY_FRIENDSLIST_FAILURE,
		error,
	};
};
export const getChatroomsList = (token) => {
	return {
		type: GET_CHATROOMS_LIST,
		token,
	};
};
export const getChatroomsListSuccess = (response) => {
	return {
		type: GET_CHATROOMS_LIST_SUCCESS,
		response,
	};
};
export const getChatroomsListFailure = (error) => {
	return {
		type: GET_CHATROOMS_LIST_FAILURE,
		error,
	};
};
