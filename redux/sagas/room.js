import axios from 'axios';
import { put } from 'redux-saga/effects';
import config from '../../config';
import {
	getAllRoomListSuccess,
	getAllRoomListFailure,
	getPromotedRoomListSuccess,
	getPromotedRoomListFailure,
	getFeaturedRoomListSuccess,
	getFeaturedRoomListFailure,
	getMyRoomListSuccess,
	getMyRoomListFailure,
	createOrUpdateRoomSuccess,
	createOrUpdateRoomFailure,
	deleteRoomSuccess,
	deleteRoomFailure,
	getRoomDetailsSuccess,
	getRoomDetailsFailure,
	getRoomUsersSuccess,
	getRoomUsersFailure,
	followUserSuccess,
	followUserFailure,
	getEditAndDeleteRoomSuccess,
	getEditAndDeleteRoomFail,
	addAndUpdateAndDeleteSuccess,
	addAndUpdateAndDeleteFail,
	// getRoomUsersSuccess,
	// getRoomUsersFail,
	setAllRoomList,
	setSearchedRooms,
} from '../actions/room';
import Config from '../../config';
import request from '../../utils/request';

let requestHeaders = Config.requestHeaders;
function uploadImage(payload, token) {
	let formdata = new FormData();
	for (const key in payload) {
		formdata.append(key, payload[key]);
	}
	const response = axios.post(
		`${Config.serverURL}/phiz/upload_files`,
		formdata,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
	return response;
}

export function* getAllRoomList(payload) {
	try {
		const response = yield request(
			`${Config.serverURL}/api/v1/home/getAllRooms`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${payload.token}`,
				},
			}
		);

		if (response.status.toLowerCase() === 'ok') {
			yield put(getAllRoomListSuccess(response.data.data));
		} else {
			yield put(getAllRoomListFailure(response.error.errors));
			Config.toasterMessage(
				'error',
				response.error.errors || 'Something went wrong! please try again'
			);
		}
	} catch (error) {
		yield put(getAllRoomListFailure('Something went wrong! please try again'));
		Config.toasterMessage('error', 'Something went wrong! please try again');
	}
}

export function* getPromotedRoomList(payload) {
	try {
		const response = yield request(
			`${Config.serverURL}/api/v1/home/getPromotedRooms`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${payload.token}`,
				},
			}
		);
		if (response.status.toLowerCase() === 'ok') {
			yield put(getPromotedRoomListSuccess(response.data.data));
		} else {
			yield put(getPromotedRoomListFailure(response.error.errors));
			Config.toasterMessage(
				'error',
				response.error.errors || 'Something went wrong! please try again'
			);
		}
	} catch (error) {
		yield put(
			getPromotedRoomListFailure('Something went wrong! please try again')
		);
		Config.toasterMessage('error', 'Something went wrong! please try again');
	}
}

export function* getFeaturedRoomList(payload) {
	try {
		const response = yield request(
			`${Config.serverURL}/api/v1/home/getFeaturedRooms`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${payload.token}`,
				},
			}
		);
		if (response.status.toLowerCase() === 'ok') {
			yield put(getFeaturedRoomListSuccess(response.data.data));
		} else {
			yield put(getFeaturedRoomListFailure(response.error.errors));
			Config.toasterMessage(
				'error',
				response.error.errors || 'Something went wrong! please try again'
			);
		}
	} catch (error) {
		yield put(
			getFeaturedRoomListFailure('Something went wrong! please try again')
		);
		Config.toasterMessage('error', 'Something went wrong! please try again');
	}
}

export function* getRoomList(payload) {
	try {
		const response = yield request(
			`${Config.serverURL}/api/v1/room/getMyRooms?search=${
				payload.search || ''
			}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${payload.token}`,
				},
			}
		);

		if (response.status.toLowerCase() === 'ok') {
			yield put(getMyRoomListSuccess(response.data.data));
		} else {
			yield put(getMyRoomListFailure(response.error.errors));
			Config.toasterMessage(
				'error',
				response.error.errors || 'Something went wrong! please try again'
			);
		}
	} catch (error) {
		yield put(getMyRoomListFailure('Something went wrong! please try again'));
		Config.toasterMessage('error', 'Something went wrong! please try again');
	}
}

export function* createOrUpdateRoom({ payload, token }) {
	try {
		const { files, ...rest } = payload;
		let res = null;
		let data = rest;
		if (files) {
			res = yield uploadImage({ folderPath: 'group', files }, token);
			data = { ...data, room_image: res.data.message[0] };
		}
		const response = yield request(
			`${Config.serverURL}/api/v1/room/createorupdate`,
			{
				method: 'POST',
				body: data,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		if (response.status.toLowerCase() === 'ok') {
			yield put(createOrUpdateRoomSuccess(response.data.data));
		} else {
			yield put(createOrUpdateRoomFailure(response.error.errors));
			Config.toasterMessage(
				'error',
				response.error.errors || 'Something went wrong! please try again'
			);
		}
	} catch (error) {
		yield put(
			createOrUpdateRoomFailure('Something went wrong! please try again')
		);
		Config.toasterMessage('error', 'Something went wrong! please try again');
	}
}

export function* deleteRoom({ payload, token }) {
	try {
		const response = yield request(
			`${Config.serverURL}/api/v1/room/deleteRoom`,
			{
				method: 'POST',
				body: payload,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		if (response.status.toLowerCase() === 'ok') {
			yield put(deleteRoomSuccess(response.data.data));
		} else {
			yield put(deleteRoomFailure(response.error.errors));
			Config.toasterMessage(
				'error',
				response.error.errors || 'Something went wrong! please try again'
			);
		}
	} catch (error) {
		yield put(deleteRoomFailure('Something went wrong! please try again'));
		Config.toasterMessage('error', 'Something went wrong! please try again');
	}
}

export function* getRoomDetails({ payload, token }) {
	try {
		const response = yield request(
			`${Config.serverURL}/api/v1/room/getRoomDetails/${payload}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		if (response.status.toLowerCase() === 'ok') {
			yield put(getRoomDetailsSuccess(response.data.data));
		} else {
			yield put(getRoomDetailsFailure(response.error.message));
			Config.toasterMessage(
				'error',
				response.error.message || 'Something went wrong! please try again'
			);
		}
	} catch (error) {
		yield put(getRoomDetailsFailure('Something went wrong! please try again'));
		Config.toasterMessage('error', 'Something went wrong! please try again');
	}
}

export function* getRoomUsers({ payload, token }) {
	try {
		const response = yield request(
			`${Config.serverURL}/api/v1/room/getRoomUsers?roomId=${payload}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		if (response.status.toLowerCase() === 'ok') {
			yield put(getRoomUsersSuccess(response.data.data));
		} else {
			yield put(getRoomUsersFailure(response.error.message));
			Config.toasterMessage(
				'error',
				response.error.message || 'Something went wrong! please try again'
			);
		}
	} catch (error) {
		yield put(getRoomUsersFailure('Something went wrong! please try again'));
		Config.toasterMessage('error', 'Something went wrong! please try again');
	}
}
//Todo send token from redux here

export function* followUser({ payload }) {
	try {
		const response = yield request(
			`${Config.serverURL}/api/v1/userRelatioin/followUser`,
			{
				method: 'POST',
				body: payload,
				...requestHeaders,
			}
		);
		if (response.status.toLowerCase() === 'ok') {
			yield put(followUserSuccess(response.data.data));
		} else {
			yield put(followUserFailure(response.error.message));
			Config.toasterMessage(
				'error',
				response.error.message || 'Something went wrong! please try again'
			);
		}
	} catch (error) {
		yield put(followUserFailure('Something went wrong! please try again'));
		Config.toasterMessage('error', 'Something went wrong! please try again');
	}
}

//old code
// export function* getRoomUsers(payload) {
//   try {
//     const resp = yield axios.get(
//       `${Config.serverURL}/api/v1/room/getRoomUsers?roomId=${payload.id}`,
//       requestHeaders
//     );
//     yield put(getRoomUsersSuccess(resp.data.data));
//   } catch (error) {
//     // console.log("GetRoomList Error: ", error.response.data);

//     let errorMsg = "GetRoomList failed.";
//     if (error.response.status === 400) {
//       errorMsg = error.response.data;
//     }

//     yield put(getRoomUsersFail(errorMsg));
//   }
// }

export function* searchRoomsSaga(action) {
	try {
		let resp = yield axios.get(
			`${Config.serverURL}/api/v1/search/searchRooms?searchTerm=${action.payload}`,
			requestHeaders
		);
		yield put(setAllRoomList('filteredRooms', resp.data.data));
	} catch (error) {
		// console.log("GetRoomList Error: ", error.response.data);
		// Config.toasterMessage(
		//   "error",
		//   error?.response?.data?.message
		//     ? error?.response?.data?.message
		//     : "Something went wrong! please try again"
		// );
		// let errorMsg = "GetRoomList failed.";
		// if (error.response.status === 400) {
		//   errorMsg = error.response.data;
		// }
		// yield put(getRoomListFail(errorMsg));
	}
}

export function* getEditAndDeleteRoom(action) {
	try {
		const resp = yield axios.post(
			`${Config.serverURL}/api/v1/room/getEditAndDeleteRoom`,
			{ roomId: action.roomId }
		);
		yield put(getEditAndDeleteRoomSuccess(resp.data.record));
	} catch (error) {
		console.log('getEditAndDeleteRoom Error: ', error.response.data);
		Config.toasterMessage(
			'error',
			error?.response?.data?.message
				? error?.response?.data?.message
				: 'Something went wrong! please try again'
		);
		let errorMsg = 'getEditAndDeleteRoom failed.';
		if (error.response.status === 400) {
			errorMsg = error.response.data;
		}

		yield put(getEditAndDeleteRoomFail(errorMsg));
	}
}

export function* addAndUpdateAndDelete(action) {
	const authData = {
		roomName: action.roomName,
		roomDescription: action.roomDescription,
		roomImage: action.file,
		roomId: action.roomId,
		userId: action.userId,
		friendList: action.friendList,
		promoteRoom: action.promoteRoom,
		deleteRoom: action.deleteRoom,
	};

	try {
		const response = yield axios.post(
			`${Config.serverURL}/api/v1/room/addAndUpdateAndDelete`,
			authData
		);
		console.log(action);
		console.log(response);
		if (action.roomId && action.file) {
			const formData = new FormData();
			formData.append('image', action.file);

			yield axios.patch(
				`${Config.serverURL}/api/v1/room/image?type=room&userId=${action.userId}&id=${action.roomId}`,
				formData
			);
		}
		if (response?.data?.data && action.file) {
			const formData = new FormData();
			formData.append('image', action.file);

			yield axios.patch(
				`${Config.serverURL}/api/v1/room/image?type=room&userId=${action.userId}&id=${response?.data?.data.insertId}`,
				formData
			);
		}
		// yield getRoomList();
		yield put(addAndUpdateAndDeleteSuccess(action.roomName));
	} catch (error) {
		console.log('addAndUpdateAndDelete Error: ', error.response.data);
		Config.toasterMessage(
			'error',
			error?.response?.data?.message
				? error?.response?.data?.message
				: 'Something went wrong! please try again'
		);
		let errorMsg = 'addAndUpdateAndDelete failed.';
		if (error.response.status === 400) {
			errorMsg = error.response.data;
		}

		yield put(addAndUpdateAndDeleteFail(errorMsg));
	}
}

export function* joinRoom(action) {
	const authData = {
		userId: action.payload.userId,
		roomId: action.payload.roomId,
	};

	try {
		const response = yield axios.patch(
			`${Config.serverURL}/api/v1/room/joinRoom`,
			authData
		);
		yield getEditAndDeleteRoom({
			roomId: authData.roomId,
		});
	} catch (error) {
		console.log('addAndUpdateAndDelete Error: ', error.response.data);
		Config.toasterMessage(
			'error',
			error?.response?.data?.message
				? error?.response?.data?.message
				: 'Something went wrong! please try again'
		);
		let errorMsg = 'addAndUpdateAndDelete failed.';
		if (error.response.status === 400) {
			errorMsg = error.response.data;
		}
	}
}

export function* leaveRoom(action) {
	const authData = {
		userId: action.payload.userId,
		roomId: action.payload.roomId,
	};

	try {
		const response = yield axios.patch(
			`${Config.serverURL}/api/v1/room/leaveRoom`,
			authData
		);
		yield getEditAndDeleteRoom({
			roomId: authData.roomId,
		});
	} catch (error) {
		console.log('addAndUpdateAndDelete Error: ', error.response.data);
		Config.toasterMessage(
			'error',
			error?.response?.data?.message
				? error?.response?.data?.message
				: 'Something went wrong! please try again'
		);
		let errorMsg = 'addAndUpdateAndDelete failed.';
		if (error.response.status === 400) {
			errorMsg = error.response.data;
		}
	}
}
