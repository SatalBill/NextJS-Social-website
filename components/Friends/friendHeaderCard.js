import React, { Component, useRef } from 'react';
import { connect } from 'react-redux';
import {
	Typography,
	Grid,
	Drawer,
	List,
	ListItem,
	ListItemText,
	IconButton,
	Button,
	Card,
	TextField,
	InputAdornment,
	Paper,
	Tabs,
	Tab,
	Input,
} from '@material-ui/core';
import SearchBox from '../build/ui-search';
import { Howl } from 'howler';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import config from '../../config';
import * as _ from 'lodash';
import * as actionTypes from '../../redux/actionTypes';
import useStyles from '../../styles/friends';

let socket = config.socket;
// let classes = useStyles();

export class friendHeaderCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			onlineUserIds: [],
			stream: '',
			caller: '',
			callAccepted: false,
			receivingCall: false,
			callerSignal: '',
			callRejected: false,
			friend: {},
		};
		this.userVideo = {};
		this.myPeer = null;
		this.partnerVideo = {};

		this.ringtoneSound = new Howl({
			src: '/assets/ringtone.mp3',
			loop: true,
			preload: true,
		});
	}

	endCall = () => {
		this.myPeer.destroy();
		socket.emit('callEnded', { to: this.state.caller.id });
		window.location.reload();
	};

	acceptCall = () => {
		let { caller } = { ...this.state };
		this.setState({ callAccepted: true });
		this.ringtoneSound.unload();
		this.props.acceptCall(caller);
		navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then((stream) => {
				// if (this.userVideo.current) {
				//     this.userVideo.current.srcObject = stream
				// }
				const oVideo = document.getElementsByClassName('o-c-video')[0];
				if (oVideo) oVideo.srcObject = stream;
				this.setState({ stream, callRejected: false });
				const peer = new Peer({
					initiator: false,
					trickle: false,
					stream: stream,
				});
				this.myPeer = peer;

				peer.on('signal', (data) => {
					socket.emit('acceptCall', {
						signal: data,
						to: caller.id,
						roomId: this.props.roomId,
					});
				});

				const fVideo = document.getElementsByClassName('f-c-video')[0];
				peer.on('stream', (stream) => {
					fVideo.srcObject = stream;
				});

				peer.on('error', (err) => {
					this.endCall();
				});

				peer.signal(this.state.callerSignal);

				socket.on('close', () => {
					window.location.reload();
				});
			})
			.catch((e) => {
				// setModalMessage(
				//     "You cannot place/ receive a call without granting video and audio permissions! Please change your settings to use Cuckoo."
				// )
				// setModalVisible(true)
			});
	};

	rejectCall = () => {
		this.ringtoneSound.unload();
		this.setState({ callRejected: true });
		socket.emit('rejected', { to: this.state.caller.id });
		window.location.reload();
	};

	callPeer = () => {
		navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then((stream) => {
				this.setState({ caller: this.props.myProfile, stream });

				const oVideo = document.getElementsByClassName('o-c-video')[0];
				if (oVideo) oVideo.srcObject = stream;
				this.props.setMyPeer(stream);

				const peer = new Peer({
					initiator: true,
					trickle: false,
					config: {
						iceServers: [
							{
								urls: 'stun:numb.viagenie.ca',
								username: 'sultan1640@gmail.com',
								credential: '98376683',
							},
							{
								urls: 'turn:numb.viagenie.ca',
								username: 'sultan1640@gmail.com',
								credential: '98376683',
							},
						],
					},
					stream: stream,
				});

				this.myPeer = peer;

				peer.on('signal', (data) => {
					console.log('peer: signal : ------ ', data, this.props.roomId);
					socket.emit('callUser', {
						userToCall: this.props.friend.id,
						signalData: data,
						from: this.props.myProfile,
						roomId: this.props.roomId,
					});
				});

				const fVideo = document.getElementsByClassName('f-c-video')[0];

				peer.on('stream', (stream) => {
					console.log('peer: stream : ------ ', stream);
					if (fVideo) fVideo.srcObject = stream;
					if (this.partnerVideo.current) {
						this.partnerVideo.current.srcObject = stream;
					}
				});

				peer.on('error', (err) => {
					this.endCall();
				});

				socket.on('callAccepted', (signal) => {
					console.log('peer: callAccepted : ------ ', signal);

					this.setState({ callAccepted: true });
					peer.signal(signal);
				});

				socket.on('close', () => {
					window.location.reload();
				});

				socket.on('rejected', () => {
					window.location.reload();
				});
			})
			.catch((e) => {
				console.log('callPeer: error: ', e);
			});

		this.props.parentCallback('vc');
	};
	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			exitCall: nextProps.exitCall,
			friend: nextProps.friend,
		};
	}
	componentDidUpdate() {
		if (this.state.exitCall) {
			// this.endCall()
		}
	}

	componentDidMount() {
		socket.on('callReceiving', (payload) => {
			console.log('callReceiving', payload);
			this.setState({
				receivingCall: true,
				caller: payload.from,
				callerSignal: payload.signal,
				callAccepted: false,
				callRejected: false,
			});
		});

		socket.on('friends-online-status', (onlineUserIds) => {
			this.setState({ onlineUserIds });
		});

		socket.on('typing-action', (payload) => {
			if (this.state.friend && this.state.friend.id === payload.senderId) {
				let friend = this.state.friend;
				friend.typing = payload.typing;
				this.setState({
					friend,
				});
			}
		});
		this.setState({ friend: this.props.friend });
	}

	checkIsOnline = (userId) => {
		let findId = _.find(
			this.state.onlineUserIds,
			(id) => parseInt(id) === parseInt(userId)
		);
		return findId;
	};

	render() {
		let { friend, receivingCall, callAccepted, callRejected, caller } = {
			...this.state,
		};

		// console.log(receivingCall && !callAccepted && !callRejected,receivingCall , !callAccepted , !callRejected)
		return (
			<div className="fr-top-card">
				{friend ? (
					<div className="message-state-header pos-re">
						<div className="horizontal-center">
							<h5>{friend.username}</h5>
							{friend.typing ? (
								<span>
									<img
										src="https://www.webrtc-experiment.com/images/key-press.gif"
										style={{ height: '25px', verticalAlign: 'middle' }}
									/>
								</span>
							) : (
								<span>
									{this.checkIsOnline(friend.id) ? 'Online' : 'Offline'}
								</span>
							)}
						</div>
						<div className="fr-hearder-serch-wraper">
							<SearchBox />
						</div>
						<div className="fr-top-icon-wrapper">
							<div
								className="fr-camera-icon"
								onClick={() => this.callPeer()}
							></div>
							<div className="fr-gift-icon"></div>
							<div className="m-f-icon"></div>
						</div>
					</div>
				) : this.props.selectedTab === 'status' ? (
					<h3>Status</h3>
				) : (
					<h3>Friend's list</h3>
				)}
				{receivingCall && !callAccepted && !callRejected ? (
					<div className="incomingCallContainer">
						<div className="incomingCall flex flex-column">
							<div style={{ color: 'initial' }}>
								<span className="callerID">{caller.username}</span> is
							</div>
							<div className="incomingCallButtons flex">
								<button
									name="accept"
									className="alertButtonPrimary"
									onClick={() => this.acceptCall()}
								>
									Accept
								</button>
								<button
									name="reject"
									className="alertButtonSecondary"
									onClick={() => this.rejectCall()}
								>
									Reject
								</button>
							</div>
						</div>
					</div>
				) : null}
				{/* <div
                        className="logoutIcon"
                        style={{ right: "5%" }}
                        onClick={(e) => {
                            e.preventDefault()
                            window.location.href = "/"
                        }}
                    ></div> */}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	myProfile: state.users.myProfile,
});

const mapDispatchToProps = (dispatch) => ({
	setMyPeer: (stream) => {
		return dispatch({ type: actionTypes.SET_MY_STREAM, stream });
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(friendHeaderCard);
