import {
	IS_SOCKET_CONNECTED,
	IS_SOCKET_JOINED,
	SAVE_ONLINE_USERS,
} from '../actionTypes';

export const isSocketConnected = (response) => {
	return {
		type: IS_SOCKET_CONNECTED,
		response,
	};
};
export const isSocketJoined = (response) => {
	return {
		type: IS_SOCKET_JOINED,
		response,
	};
};
export const saveOnlineUsers = (response) => {
	return {
		type: SAVE_ONLINE_USERS,
		response,
	};
};
