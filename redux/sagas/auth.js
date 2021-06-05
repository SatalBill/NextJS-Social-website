import axios from 'axios';
import { put } from 'redux-saga/effects';
import config from '../../config';
import {
	userLoginSuccess,
	userLoginFailure,
	userRegisterSuccess,
	userRegisterFailure,
	forgotPasswordSuccess,
	forgotPasswordFail,
} from '../actions/auth';
import { setLocalStorage } from '../../utils/localstorage';
import Config from '../../config';
import request from '../../utils/request';

export function* signin({ payload }) {
	try {
		const response = yield request(`${Config.serverURL}/api/v1/auth/login`, {
			method: 'POST',
			body: payload,
		});
		console.log(response);
		if (response.status.toLowerCase() === 'ok') {
			yield put(userLoginSuccess(response.data.data));
			setLocalStorage('--PhizUser--', JSON.stringify(response.data.data.user));
			setLocalStorage('--PhizToken--', response.data.data.token);
			//Todo need to remove all of them below in the end - no need to use them
			// setLocalStorage('user', JSON.stringify(response.data.data.user));
			// setLocalStorage('userId', response.data.data.user.id);
			// setLocalStorage('userName', response.data.data.user.username);
			// setLocalStorage('profile', JSON.stringify(response.data.data.user));
			// setLocalStorage('phiz.token', response.data.data.token);
		} else {
			yield put(userLoginFailure(response.error.message));
		}
	} catch (error) {
		yield put(userLoginFailure('Something went wrong! please try again'));
	}
}

export function* signup({ payload }) {
	try {
		const response = yield request(`${Config.serverURL}/api/v1/auth/signup`, {
			method: 'POST',
			body: payload,
		});
		if (response.status.toLowerCase() === 'ok') {
			yield put(userRegisterSuccess());
		} else {
			yield put(userRegisterFailure(response.error.errors[0].message));
		}
	} catch (error) {
		yield put(userRegisterFailure('Something went wrong! please try again'));
	}
}

export function* forgotPassword({ payload }) {
	try {
		const response = yield request(
			`${Config.serverURL}/api/v1/auth/forgotPassword`,
			{
				method: 'POST',
				body: payload,
			}
		);
		console.log('respo***', response);
		if (response.status.toLowerCase() === 'ok') {
			yield put(forgotPasswordSuccess(response.data.record.password));
		} else {
			yield put(forgotPasswordFailure(response.error.errors[0].message));
		}
	} catch (error) {
		yield put(forgotPasswordFailure('Something went wrong! please try again'));
	}
}
//old
// export function* signup(action) {
// 	const authData = {
// 		username: action.userName,
// 		email: action.email,
// 		password: action.password,
// 	};
// 	yield put(setAuthLoader(true));
// 	try {
// 		const res = yield axios.post(
// 			`${Config.serverURL}/api/v1/auth/signup`,
// 			authData
// 		);
// 		if (res.data.message) {
// 			Config.toasterMessage('success', res.data.message);
// 		}
// 		yield put(signupSuccess(action.email));
// 		yield put(setAuthLoader(false));
// 	} catch (error) {
// 		console.log('SignUp Error: ', error.response.data);
// 		yield put(setAuthLoader(false));
// 		Config.toasterMessage(
// 			'error',
// 			error?.response?.data?.message
// 				? error?.response?.data?.message
// 				: 'Something went wrong! please try again'
// 		);
// 		let errorMsg = 'Sign up failed.';
// 		if (error.response.status === 400) {
// 			errorMsg = error.response.data;
// 		}
// 		yield put(signupFail(errorMsg));
// 	}
// }

// export function* signin(action) {
// 	const authData = {
// 		email: action.email,
// 		password: action.password,
// 	};
// 	yield put(setAuthLoader(true));
// 	try {
// 		const resp = yield axios.post(
// 			`${Config.serverURL}/api/v1/auth/login`,
// 			authData
// 		);
// 		console.log(resp);
// 		if (resp && resp.data && resp.data.data && resp.data.data.token) {
// 			config.requestHeaders.headers.Authorization = `Bearer ${resp.data.data.token}`;
// 			console.log(resp.data.data.token);

// 			setLocalStorage('user', JSON.stringify(resp.data.data.user));
// 			setLocalStorage('userId', resp.data.data.user.id);
// 			setLocalStorage('userName', resp.data.data.user.username);
// 			setLocalStorage('profile', resp.data.data.user.profile);
// 			setLocalStorage('phiz.token', resp.data.data.token);
// 			getLocalStorage('userId');
// 			// setLocalStorage("gold", resp.data.record.gold)

// 			yield put(signinSuccess(resp.data.data));
// 			yield put(setAuthLoader(false));
// 		} else {
// 			Config.toasterMessage(
// 				'error',
// 				resp?.data?.message
// 					? resp?.data?.message
// 					: 'Something went wrong! please try again'
// 			);
// 		}

// 		yield put(setAuthLoader(false));
// 	} catch (error) {
// 		console.log('SignIn Error: ', error);
// 		let errorMsg = 'Sign in failed.';
// 		yield put(signinFail(errorMsg));
// 		yield put(setAuthLoader(false));

// 		Config.toasterMessage(
// 			'error',
// 			error?.response?.data?.message
// 				? error?.response?.data?.message
// 				: 'Something went wrong! please try again'
// 		);
// 		if (error.response && error.response.status === 400) {
// 			errorMsg = error.response.data;
// 		}
// 	}
// }

// export function* forgotPassword(action) {
// 	yield put(setAuthLoader(true));
// 	try {
// 		const resp = yield axios.post(
// 			`${Config.serverURL}/api/v1/auth/forgotPassword`,
// 			{
// 				email: action.email,
// 			}
// 		);
// 		yield put(forgotPasswordSuccess(resp.data.record.password));
// 		yield put(setAuthLoader(false));
// 	} catch (error) {
// 		console.log('ForgotPassword Error: ', error.response.data);
// 		Config.toasterMessage(
// 			'error',
// 			error?.response?.data?.message
// 				? error?.response?.data?.message
// 				: 'Something went wrong! please try again'
// 		);
// 		let errorMsg = 'Failed to send email.';
// 		if (error.response.status === 400) {
// 			errorMsg = error.response.data;
// 		}
// 		yield put(setAuthLoader(false));
// 		yield put(forgotPasswordFail(errorMsg));
// 	}
// }
