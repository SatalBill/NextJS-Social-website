import * as actionTypes from '../actionTypes';
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

const initialState = {
	loading: false,
	error: null,
	allRooms: [],
	promotedRooms: [],
	featuredRooms: [],
	myRooms: [],
	isRoomCreated: false,
	isRoomDeleted: false,
	selectedRoom: null,
	peer: null,
	myPeer: null,

	roomList: [],
	specialRoom: [],
	roomUsersList: [],
	filteredRooms: null,
	roomName: null,
	roomListError: null,
	roomNameError: null,
	roomUsersError: null,
};

const getEditAndDeleteRoomSuccess = (state, action) => {
	return {
		...state,
		specialRoom: action.specialRoom,
	};
};

const getEditAndDeleteRoomFail = (state, action) => {
	return {
		...state,
		roomListError: action.error,
	};
};

const addAndUpdateAndDeleteSuccess = (state, action) => {
	return {
		...state,
		roomName: action.roomName,
	};
};

const addAndUpdateAndDeleteFail = (state, action) => {
	return {
		...state,
		roomNameError: action.error,
	};
};
const setAllRooms = (state, action) => {
	return {
		...state,
		[action.payload.key]: action.payload.value,
	};
};

const room = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_ROOM_LIST:
			return {
				...state,
				loading: true,
			};
		case GET_ALL_ROOM_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				allRooms: action.response,
			};
		case GET_ALL_ROOM_LIST_FAILURE:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		case GET_PROMOTED_ROOM_LIST:
			return {
				...state,
				loading: true,
			};
		case GET_PROMOTED_ROOM_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				promotedRooms: action.response,
			};
		case GET_PROMOTED_ROOM_LIST_FAILURE:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		case GET_FEATURED_ROOM_LIST:
			return {
				...state,
				loading: true,
			};
		case GET_FEATURED_ROOM_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				featuredRooms: action.response,
			};
		case GET_FEATURED_ROOM_LIST_FAILURE:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		case GET_MY_ROOM_LIST:
			return {
				...state,
				loading: true,
			};
		case GET_MY_ROOM_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				myRooms: action.response,
			};
		case GET_MY_ROOM_LIST_FAILURE:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		case CREATE_OR_UPDATE_ROOM:
			return {
				...state,
				loading: true,
			};
		case CREATE_OR_UPDATE_ROOM_SUCCESS:
			return {
				...state,
				loading: false,
				myRooms: action.response,
				isRoomCreated: true,
			};
		case CREATE_OR_UPDATE_ROOM_FAILURE:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		case DELETE_ROOM:
			return {
				...state,
				loading: true,
			};
		case DELETE_ROOM_SUCCESS:
			return {
				...state,
				loading: false,
				myRooms: action.response,
				isRoomDeleted: true,
			};
		case DELETE_ROOM_FAILURE:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		case GET_ROOM_DETAILS:
			return {
				...state,
				loading: true,
			};
		case GET_ROOM_DETAILS_SUCCESS:
			return {
				...state,
				loading: false,
				selectedRoom: action.response,
			};
		case GET_ROOM_DETAILS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		case GET_ROOM_USERS:
			return {
				...state,
				loading: true,
			};
		case GET_ROOM_USERS_SUCCESS:
			return {
				...state,
				loading: false,
				selectedRoom: { ...state.selectedRoom, RoomUsers: action.response },
			};
		case GET_ROOM_USERS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		case FOLLOW_USER:
			return {
				...state,
				loading: true,
			};
		case FOLLOW_USER_SUCCESS:
			return {
				...state,
				loading: false,
				// selectedRoom:{...state.selectedRoom,RoomUsers:action.response}
			};
		case FOLLOW_USER_FAILURE:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		case SET_PEERS:
			return {
				...state,
				loading: false,
				peer: action.peer,
			};
		case SET_MY_PEER:
			console.log('myperred0', action);
			return {
				...state,
				loading: false,
				myPeer: action.myPeer,
			};
		case RESET_FLAGS:
			return {
				...state,
				loading: false,
				isRoomDeleted: false,
				isRoomCreated: false,
			};
		//old code
		// case actionTypes.GET_ROOM_USERS_SUCCESS:
		//   return {
		//     ...state,
		//     roomUsersList: action.payload,
		//     roomUsersError: null,
		//   };
		// case actionTypes.GET_ROOM_USERS_FAIL:
		//   return {
		//     ...state,
		//     roomUsersError: action.payload,
		//   };
		case actionTypes.GET_ROOMEDITANDDELETE_SUCCESS:
			return getEditAndDeleteRoomSuccess(state, action);
		case actionTypes.GET_ROOMEDITANDDELETE_FAIL:
			return getEditAndDeleteRoomFail(state, action);
		case actionTypes.ADD_ROOM_SUCCESS:
			return addAndUpdateAndDeleteSuccess(state, action);
		case actionTypes.ADD_ROOM_FAIL:
			return addAndUpdateAndDeleteFail(state, action);
		case actionTypes.SET_ALL_ROOM_LIST:
			return setAllRooms(state, action);
		default:
			return state;
	}
};
export default room;
