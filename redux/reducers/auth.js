import {
	USER_LOGIN,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAILURE,
	USER_REGISTER,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAILURE,
	FORGOT_PASSWORD,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAILURE,
	SET_TOKEN,
	SET_PROFILE,
	RESET_USER_FLAGS,
} from '../actionTypes';

const initialState = {
	laoding: false,
	user: null,
	token: null,
	isUserRegistered: false,
	error: '',
	//old
	// isAuthenticated: false,
	// signupEmail: null,
	// retPassword: null,
	// signinError: null,
	// signupError: null,
	// forgotPasswordError: null,
	// loader: false,
	// user: (getLocalStorage('user') && JSON.parse(getLocalStorage('user'))) || {},
	// token: getLocalStorage('phiz.token'),
};

const auth = (state = initialState, action) => {
	switch (action.type) {
		case USER_LOGIN:
			return {
				...state,
				loading: true,
			};
		case USER_LOGIN_SUCCESS:
			return {
				...state,
				loading: false,
				user: action.response.user,
				token: action.response.token,
			};
		case USER_LOGIN_FAILURE:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		case USER_REGISTER:
			return {
				...state,
				loading: true,
			};
		case USER_REGISTER_SUCCESS:
			return {
				...state,
				loading: false,
				isUserRegistered: true,
			};
		case USER_REGISTER_FAILURE:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		case FORGOT_PASSWORD:
			return {
				...state,
				loading: true,
			};
		case FORGOT_PASSWORD_SUCCESS:
			return {
				...state,
				loading: false,
				// isUserRegistered: true,
			};
		case FORGOT_PASSWORD_FAILURE:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		case SET_TOKEN:
			return {
				...state,
				token: action.token,
			};
		case SET_PROFILE:
			return {
				...state,
				user: action.user,
			};
		case RESET_USER_FLAGS:
			return {
				...state,
				isUserRegistered: false,
			};

		default:
			return state;
	}
};
export default auth;
