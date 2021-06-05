import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client';
import Config from '../../config';
import {
	isSocketConnected,
	isSocketJoined,
	saveOnlineUsers,
} from '../../redux/actions/app';
// import {
//   fetchBusinesses,
//   updateAccountStatus,
// } from '../../../redux/business/actions';

const WebSockets = ({
	user,
	token,
	isSocketConnected,
	isSocketJoined,
	saveOnlineUsers,
}) => {
	useEffect(() => {
		if (user) {
			initSockets();
		}
	}, [user]);

	const initSockets = () => {
		console.log('************user', user);
		let socket = io.connect(Config.serverURL);

		socket.on('connect', () => {
			isSocketConnected(true);
		});

		socket.emit('join-socket', user.id);

		socket.on('onlineUsers', (onlineUsers) => {
			saveOnlineUsers(onlineUsers);
		});

		socket.on('new-private-message', function (data) {
			// receiveMessage(data)
			console.log('data', data);
		});
	};
	return <div style={{ width: 0, height: 0 }} />;
};

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
		token: state.auth.token,
	};
};

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			isSocketConnected,
			isSocketJoined,
			saveOnlineUsers,
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(WebSockets);
