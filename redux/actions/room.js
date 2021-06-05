import {
	GET_ALL_ROOM_LIST,
	GET_ALL_ROOM_LIST_SUCCESS,
	GET_ALL_ROOM_LIST_FAILURE,
	GET_PROMOTED_ROOM_LIST,
	GET_PROMOTED_ROOM_LIST_SUCCESS,
	GET_PROMOTED_ROOM_LIST_FAILURE,
	GET_FEATURED_ROOM_LIST,
	GET_FEATURED_ROOM_LIST_SUCCESS,
	GET_FEATURED_ROOM_LIST_FAILURE,
	GET_MY_ROOM_LIST,
	GET_MY_ROOM_LIST_SUCCESS,
	GET_MY_ROOM_LIST_FAILURE,
	CREATE_OR_UPDATE_ROOM,
	CREATE_OR_UPDATE_ROOM_SUCCESS,
	CREATE_OR_UPDATE_ROOM_FAILURE,
	DELETE_ROOM,
	DELETE_ROOM_SUCCESS,
	DELETE_ROOM_FAILURE,
	GET_ROOM_DETAILS,
	GET_ROOM_DETAILS_SUCCESS,
	GET_ROOM_DETAILS_FAILURE,
	GET_ROOM_USERS,
	GET_ROOM_USERS_SUCCESS,
	GET_ROOM_USERS_FAILURE,
	FOLLOW_USER,
	FOLLOW_USER_SUCCESS,
	FOLLOW_USER_FAILURE,
	SET_PEERS,
	SET_MY_PEER,
	RESET_FLAGS,
} from '../actionTypes';
import * as actionTypes from '../actionTypes';

export const getAllRoomList = (token) => {
	return {
		type: GET_ALL_ROOM_LIST,
		token,
	};
};
export const getAllRoomListSuccess = (response) => {
	return {
		type: GET_ALL_ROOM_LIST_SUCCESS,
		response,
	};
};
export const getAllRoomListFailure = (error) => {
	return {
		type: GET_ALL_ROOM_LIST_FAILURE,
		error,
	};
};
export const getPromotedRoomList = (token) => {
	return {
		type: GET_PROMOTED_ROOM_LIST,
		token,
	};
};
export const getPromotedRoomListSuccess = (response) => {
	return {
		type: GET_PROMOTED_ROOM_LIST_SUCCESS,
		response,
	};
};
export const getPromotedRoomListFailure = (error) => {
	return {
		type: GET_PROMOTED_ROOM_LIST_FAILURE,
		error,
	};
};
export const getFeaturedRoomList = (token) => {
	return {
		type: GET_FEATURED_ROOM_LIST,
		token,
	};
};
export const getFeaturedRoomListSuccess = (response) => {
	return {
		type: GET_FEATURED_ROOM_LIST_SUCCESS,
		response,
	};
};
export const getFeaturedRoomListFailure = (error) => {
	return {
		type: GET_FEATURED_ROOM_LIST_FAILURE,
		error,
	};
};
export const getMyRoomList = (payload, token) => {
	return {
		type: GET_MY_ROOM_LIST,
		payload,
		token,
	};
};
export const getMyRoomListSuccess = (response) => {
	return {
		type: GET_MY_ROOM_LIST_SUCCESS,
		response,
	};
};
export const getMyRoomListFailure = (error) => {
	return {
		type: GET_MY_ROOM_LIST_FAILURE,
		error,
	};
};
export const createOrUpdateRoom = (payload, token) => {
	return {
		type: CREATE_OR_UPDATE_ROOM,
		payload,
		token,
	};
};
export const createOrUpdateRoomSuccess = (response) => {
	return {
		type: CREATE_OR_UPDATE_ROOM_SUCCESS,
		response,
	};
};
export const createOrUpdateRoomFailure = (error) => {
	return {
		type: CREATE_OR_UPDATE_ROOM_FAILURE,
		error,
	};
};
export const deleteRoom = (payload, token) => {
	return {
		type: DELETE_ROOM,
		payload,
		token,
	};
};
export const deleteRoomSuccess = (response) => {
	return {
		type: DELETE_ROOM_SUCCESS,
		response,
	};
};
export const deleteRoomFailure = (error) => {
	return {
		type: DELETE_ROOM_FAILURE,
		error,
	};
};
export const getRoomDetails = (payload, token) => {
	return {
		type: GET_ROOM_DETAILS,
		payload,
		token,
	};
};
export const getRoomDetailsSuccess = (response) => {
	return {
		type: GET_ROOM_DETAILS_SUCCESS,
		response,
	};
};
export const getRoomDetailsFailure = (error) => {
	return {
		type: GET_ROOM_DETAILS_FAILURE,
		error,
	};
};
export const getRoomUsers = (payload, token) => {
	return {
		type: GET_ROOM_USERS,
		payload,
		token,
	};
};
export const getRoomUsersSuccess = (response) => {
	return {
		type: GET_ROOM_USERS_SUCCESS,
		response,
	};
};
export const getRoomUsersFailure = (error) => {
	return {
		type: GET_ROOM_USERS_FAILURE,
		error,
	};
};
//Todo send token from redux here
export const followUser = (payload) => {
	return {
		type: FOLLOW_USER,
		payload,
	};
};
export const followUserSuccess = (response) => {
	return {
		type: FOLLOW_USER_SUCCESS,
		response,
	};
};
export const followUserFailure = (error) => {
	return {
		type: FOLLOW_USER_FAILURE,
		error,
	};
};
export const setPeers = (peer) => {
	return {
		type: SET_PEERS,
		peer,
	};
};
export const setMyPeer = (mypeer) => {
	return {
		type: SET_MY_PEER,
		mypeer,
	};
};
export const resetFlags = () => {
	return {
		type: RESET_FLAGS,
	};
};

//old code
// export const getRoomUsersSuccess = (userList) => {
//   return {
//     type: actionTypes.GET_ROOM_USERS_SUCCESS,
//     payload: userList,
//   };
// };

// export const getRoomUsersFail = () => {
//   return {
//     type: actionTypes.GET_ROOM_USERS_FAIL,
//   };
// };

// export const getAllRoomList = () => {
//   return {
//     type: actionTypes.GET_ALL_ROOM_LIST,
//   };
// };

export const setAllRoomList = (key, value) => {
	return {
		type: actionTypes.SET_ALL_ROOM_LIST,
		payload: {
			key,
			value,
		},
	};
};

export const getEditAndDeleteRoom = (roomId) => {
	return {
		type: actionTypes.GET_ROOMEDITANDDELETE,
		roomId,
	};
};

export const getEditAndDeleteRoomSuccess = (specialRoom) => {
	return {
		type: actionTypes.GET_ROOMEDITANDDELETE_SUCCESS,
		specialRoom,
	};
};

export const joinRoom = (roomId, userId) => {
	return {
		type: actionTypes.JOIN_ROOM,
		payload: {
			roomId,
			userId,
		},
	};
};
export const joinRoomSuccess = (payload) => {
	return {
		type: actionTypes.JOIN_ROOM_SUCCESS,
		payload,
	};
};

export const leaveRoom = (roomId, userId) => {
	return {
		type: actionTypes.LEAVE_ROOM,
		payload: {
			roomId,
			userId,
		},
	};
};
export const leaveRoomSuccess = (payload) => {
	return {
		type: actionTypes.LEAVE_ROOM_SUCCESS,
		payload,
	};
};

export const getEditAndDeleteRoomFail = (error) => {
	return {
		type: actionTypes.GET_ROOMEDITANDDELETE_FAIL,
		error,
	};
};

export const addAndUpdateAndDelete = (
	roomName,
	roomDescription,
	roomImage,
	userId,
	roomId,
	friendList,
	promoteRoom,
	deleteRoom,
	file
) => {
	return {
		type: actionTypes.ADD_ROOM,
		roomName,
		roomDescription,
		roomImage,
		userId,
		roomId,
		friendList,
		promoteRoom,
		deleteRoom,
		file,
	};
};

export const addAndUpdateAndDeleteSuccess = (roomName) => {
	return {
		type: actionTypes.ADD_ROOM_SUCCESS,
		roomName,
	};
};

export const addAndUpdateAndDeleteFail = (error) => {
	return {
		type: actionTypes.ADD_ROOM_FAIL,
		error,
	};
};

export const searchRooms = (searchTerm) => {
	return {
		type: actionTypes.GET_FILTER_ROOMS,
		payload: searchTerm,
	};
};
