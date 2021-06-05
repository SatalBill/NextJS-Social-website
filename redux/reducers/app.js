import {
	IS_SOCKET_CONNECTED,
	IS_SOCKET_JOINED,
	SAVE_ONLINE_USERS,
} from '../actionTypes';

const initialState = {
	socketConnection: false,
	socketJoined: false,
	onlineUsers: [],
};

const app = (state = initialState, action) => {
	switch (action.type) {
		case IS_SOCKET_CONNECTED:
			return {
				...state,
				socketConnection: action.response,
			};
		case IS_SOCKET_JOINED:
			return {
				...state,
				socketJoined: action.response,
			};
		case SAVE_ONLINE_USERS:
			return {
				...state,
				onlineUsers: action.response,
			};
		default:
			return state;
	}
};
export default app;
