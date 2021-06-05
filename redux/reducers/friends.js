import {
	GET_MY_FRIENDSLIST,
	GET_MY_FRIENDSLIST_SUCCESS,
	GET_MY_FRIENDSLIST_FAILURE,
	GET_CHATROOMS_LIST,
	GET_CHATROOMS_LIST_SUCCESS,
	GET_CHATROOMS_LIST_FAILURE,
} from '../actionTypes';

const initialState = {
	myFriendsList: [],
	chatroomsList: [],
	laoding: false,
	error: '',
};

const friends = (state = initialState, action) => {
	switch (action.type) {
		case GET_MY_FRIENDSLIST:
			return {
				...state,
				loading: true,
			};
		case GET_MY_FRIENDSLIST_SUCCESS:
			return {
				...state,
				loading: false,
				myFriendsList: action.response,
			};
		case GET_MY_FRIENDSLIST_FAILURE:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		case GET_CHATROOMS_LIST:
			return {
				...state,
				loading: true,
			};
		case GET_CHATROOMS_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				chatroomsList: action.response,
			};
		case GET_CHATROOMS_LIST_FAILURE:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		default:
			return state;
	}
};
export default friends;
