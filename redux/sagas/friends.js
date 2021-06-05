import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import {
	getMyFriendListSuccess,
	getMyFriendListFailure,
	getChatroomsListSuccess,
	getChatroomsListFailure,
} from '../actions/friends';
import Config from '../../config';
import request from '../../utils/request';

let requestHeaders = Config.requestHeaders;

export function* getMyFriendsList({ token }) {
	try {
		const response = yield request(
			`${Config.serverURL}/api/v1/userRelation/getUserFriends`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		if (response.status.toLowerCase() === 'ok') {
			yield put(getMyFriendListSuccess(response.data.data));
		} else {
			yield put(getMyFriendListFailure(response.error.errors));
			Config.toasterMessage(
				'error',
				response.error.errors || 'Something went wrong! please try again'
			);
		}
	} catch (error) {
		yield put(getMyFriendListFailure('Something went wrong! please try again'));
		Config.toasterMessage('error', 'Something went wrong! please try again');
	}
}

export function* getChatroomsList({ token }) {
	try {
		const response = yield request(
			`${Config.serverURL}/api/v1/chat/getUserChats`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		console.log('***response*****', response);
		if (response.status.toLowerCase() === 'ok') {
			yield put(getChatroomsListSuccess(response.data.data));
		} else {
			yield put(getChatroomsListFailure(response.error.errors));
			Config.toasterMessage(
				'error',
				response.error.errors || 'Something went wrong! please try again'
			);
		}
	} catch (error) {
		yield put(
			getChatroomsListFailure('Something went wrong! please try again')
		);
		Config.toasterMessage('error', 'Something went wrong! please try again');
	}
}
