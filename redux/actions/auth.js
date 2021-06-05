import {
	USER_LOGIN,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAILURE,
	USER_REGISTER,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAILURE,
	SET_TOKEN,
	SET_PROFILE,
	RESET_USER_FLAGS,
	FORGOT_PASSWORD,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAILURE,
} from '../actionTypes';

export const userLogin = (payload) => {
	return {
		type: USER_LOGIN,
		payload,
	};
};
export const userLoginSuccess = (response) => {
	return {
		type: USER_LOGIN_SUCCESS,
		response,
	};
};
export const userLoginFailure = (error) => {
	return {
		type: USER_LOGIN_FAILURE,
		error,
	};
};
export const userRegister = (payload) => {
	return {
		type: USER_REGISTER,
		payload,
	};
};
export const userRegisterSuccess = (response) => {
	return {
		type: USER_REGISTER_SUCCESS,
		response,
	};
};
export const userRegisterFailure = (error) => {
	return {
		type: USER_REGISTER_FAILURE,
		error,
	};
};
export const setToken = (token) => {
	return {
		type: SET_TOKEN,
		token,
	};
};
export const setProfile = (profile) => {
	return {
		type: SET_PROFILE,
		profile,
	};
};
export const resetUserFlags = () => {
	return {
		type: RESET_USER_FLAGS,
	};
};
export const forgotPassword = (payload) => {
	return {
		type: FORGOT_PASSWORD,
		payload,
	};
};

export const forgotPasswordSuccess = (response) => {
	return {
		type: FORGOT_PASSWORD_SUCCESS,
		response,
	};
};

export const forgotPasswordFailure = (error) => {
	return {
		type: FORGOT_PASSWORD_FAILURE,
		error,
	};
};
