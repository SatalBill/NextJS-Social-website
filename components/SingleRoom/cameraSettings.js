import React, { useState, useEffect } from 'react';
import {
	Grid,
	Typography,
	Button,
	DialogActions,
	Select,
	Input,
	MenuItem,
	IconButton,
	Switch,
	withStyles,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import useStyles from '../../styles/cameraSettings';
import * as mediasoupClient from 'mediasoup-client';
import * as EasyMediasoup from '../../utils/em3-client.bundle';
import { getIsMobile } from '../../utils/localstorage';
import config from '../../config';
import { setMyPeer } from '../../redux/actions/room';

const AntSwitch = withStyles((theme) => ({
	root: {
		width: 28,
		height: 16,
		padding: 0,
		display: 'flex',
		marginTop: '10px',
	},
	switchBase: {
		padding: 2,
		color: theme.palette.grey[500],
		'&$checked': {
			transform: 'translateX(12px)',
			color: theme.palette.common.white,
			'& + $track': {
				opacity: 1,
				background:
					'transparent linear-gradient(139deg, #ff9200 0%, #ff3100 100%) 0% 0% no-repeat padding-box',
				// borderColor: theme.palette.primary.main,
			},
		},
	},
	thumb: {
		width: 12,
		height: 12,
		boxShadow: 'none',
	},
	track: {
		border: `1px solid ${theme.palette.grey[500]}`,
		borderRadius: 16 / 2,
		opacity: 1,
		backgroundColor: theme.palette.common.white,
	},
	checked: {},
}))(Switch);

export const CameraSetting = ({
	handleClose,
	selectedRoom,
	user,
	setPeers,
	peers,
	setMyPeer,
	myPeer,
	// setPeers,
	// peers,
	setCommonGridPeerIds,
	setFocusedPeerIds,
	commonGridPeerIds,
	focusedPeerIds,
}) => {
	const classes = useStyles();
	const isMobile = getIsMobile();
	const [acousticCheck, setAcousticCheck] = useState(true);
	// const [peers, setPeers] = useState({});
	const [sharingPeer, setSharingPeer] = useState(null);
	const [localStream, setLocalStream] = useState(null);
	const [userId, setUserId] = useState((Math.random() * 1e6).toFixed(0));
	const [selectedMic, setSelectedMic] = useState('');

	console.log('********peers******', peers, userId, peers[userId]);

	useEffect(() => {
		const camera = accessCamera();

		if (camera) {
			initMedia({
				roomId: selectedRoom ? selectedRoom.id : '',
				userId: userId,
			});
		}
	}, []);

	// useEffect(() => {
	// 	if (myPeer) {
	// 		// setPeersList(peers);
	// 		setMyPeer(peers[userId]);
	// 	}
	// }, [myPeer]);

	// useEffect(() => {
	// 	if (peers) {
	// 		// setPeersList(peers);
	// 		setMyPeer(peers[userId]);
	// 	}
	// }, [peers]);

	const accessCamera = async () => {
		const handlerName = mediasoupClient.detectDevice();
		if (handlerName) {
			const device = new mediasoupClient.Device();
			if (!device) return;
			var video = document.querySelector('#videoEle');
			if (video) {
				if (navigator?.mediaDevices?.getUserMedia) {
					navigator.mediaDevices
						.getUserMedia({ video: true, audio: true })
						.then(function (stream) {
							setLocalStream(stream);
							video.srcObject = stream;
						})
						.catch(function (error) {
							console.log('Something went wrong!', error);
						});
				}
			}
		} else {
			console.warn('no suitable handler found for current browser/device');
		}
	};

	const initMedia = ({ roomId, userId, cameraId, micId, echoCancellation }) => {
		let config = {
			autorun: true,
			roomId: roomId,
			peerId: userId,
			useDataChannel: false,
			skipConsumers: false,
			isMobile: false,
			mediaServerWss: 'wss://phizlive.io',
			produce: true,
			consume: true,
			initialCamMuted: true,
			initialMicMuted: true,
			svc: 'S3T3',
			forceVP9: false,
			initialCameraResolution: {
				height: 200,
				frameRate: 24,
			},
			camDeviceId: cameraId || 'default',
			micDeviceId: micId || 'default',
			checkPremissionsInAdvance: true,
			defaultAudioConstraints: {
				echoCancellation: { exact: true },
				googEchoCancellation: { exact: true },
				googAutoGainControl: { exact: true },
				googNoiseSuppression: { exact: true },
			},
			turnservers: [],
			useSharingSimulcast: false,
			useSimulcast: true,
			videoEncodings: [{ maxBitrate: 300000 }],

			canvasShareFPS: 25,
		};

		em = window.em = new EasyMediasoup.Init(config);

		em.emitter.on('joinRoom', (client) => {
			client = client;
		});
		em.emitter.on('SET_ROOM_STATE', (state) => {
			console.log('SET_ROOM_STATE', state);
		});
		em.emitter.on('peerRemoved', (peerId) => {
			delete peers[peerId];
			commonGidPeerIds.delete(peerId);
			focusedPeerIds.delete(peerId);
			setCommonGridPeerIds(commonGridPeerIds);
			setFocusedPeerIds(focusedPeerIds);
			setPeers(peers);
		});
		em.emitter.on('SET_PRODUCER_TRACK', (producer) => {
			if (producer.track.kind !== 'audio') {
				setTrack(producer, userId);
			}
		});
		em.emitter.on('ADD_PRODUCER', (producer) => {
			if (producer.track.kind !== 'audio') {
				setTrack(producer, userId);
			}
		});
		em.emitter.on('ADD_CONSUMER', ({ peerId, consumer }) => {
			setTrack(consumer, peerId);
		});
		em.emitter.on('REMOVE_CONSUMER', ({ consumerId, peerId }) => {
			let sharingPeer = sharingPeer;
			const peer = getPeer(peerId);
			if (peer.video.id === consumerId) {
				peer.video = {};
			}
			if (peer.audio.id === consumerId) {
				peer.audio = {};
			}
			if (peer.screen.id === consumerId) {
				peer.screen = {};
				sharingPeer = null;
			}
			setSharingPeer(sharingPeer);
			setPeers({ ...peers, [peer.id]: peer });
		});
	};

	const setTrack = (msTrack, peerId) => {
		const peer = getPeer(peerId);
		const track = msTrack.track;
		let sharingPeer = sharingPeer;
		const stream = new MediaStream();
		stream.addTrack(track);
		const source = {
			id: msTrack.id,
			stream,
		};
		if (
			track.kind === 'video' &&
			!(msTrack.appData && msTrack.appData.share) &&
			msTrack.type !== 'share'
		) {
			peer.video = source;
			// replaceTrack(peer.videoStream, track);
		} else if (track.kind === 'audio') {
			peer.audio = source;
			// replaceTrack(peer.audioStream, track);
		} else if (
			track.kind === 'video' &&
			((msTrack.appData && msTrack.appData.share) || msTrack.type === 'share')
		) {
			peer.screen = source;
			sharingPeer = peer;
			// replaceTrack(peer.screenStream, track);
		}

		setSharingPeer(sharingPeer);
		setPeers({ ...peers, [peer.id]: peer });
		// setMyPeer(peers[userId]);
	};

	const getPeer = (peerId) => {
		let peer = peers[peerId];
		if (!peer) {
			peer = {
				id: peerId,
				video: {},
				audio: {},
				screen: {},
				volume: 1,
				muted: false,
			};

			if (peerId !== userId) {
				setCommonGridPeerIds(commonGridPeerIds.add(peerId));
			}
			setCommonGridPeerIds(commonGridPeerIds);
			setPeers({ ...peers, [peerId]: peer });
			// setMyPeer(peers[userId]);
		}
		return peer;
	};

	// const checkHandler = (txt) => {
	// 	if (txt === 'camera') {
	// if (frontCameraStream) {
	// setButtonText('proceed');
	// } else {
	// 	setButtonText('close');
	// }
	// }
	// else {
	//   this.setState({ micCheck: !this.state.micCheck }, () => {
	//     if (
	//       this.state.mi_phone &&
	//       this.state.cameraCheck &&
	//       this.state.micCheck
	//     ) {
	//       this.setState({ process: "PROCEED" });
	//     } else {
	//       this.setState({ process: "close" });
	//     }
	//   });
	//   $(".mic-wraper").toggleClass("bor");
	//   $(".mic-select-img").toggleClass("back-change");
	// }
	// };

	const handleJoinRoom = (action) => {
		if (action === 'CLOSE') {
			leaveRoom();
		} else {
			setLocalStream(
				localStream.getTracks().forEach(function (track) {
					track.stop();
				})
			);
			joinRoom(selectedRoom && selectedRoom.id);
			setMyPeer(peers && peers[userId]);
		}
	};

	const leaveRoom = () => {
		console.log('leave');
		// stopStream("all");
		// closePC();
	};

	//   const stopStream=(type)=>{
	// 	Object.keys(this.state.peerConnections).map((socketId) => {
	//         let pc = this.state.peerConnections[socketId]
	//         if (pc) {
	//             pc.getSenders().find(function (s) {
	//                 if (s && s.track) {
	//                     if (s.track.kind == type) {
	//                         s.track.stop()
	//                     }
	//                     if (type === "all") {
	//                         s.track.stop()
	//                     }
	//                 }

	//             });
	//         }
	//     })
	//     // this.updateMediaAction()
	//   }

	//   const closePC=()=>{  !_.isEmpty(this.state.localStream) && this.state.localStream.stop()
	//   peerConnections = peerConnections || this.state.peerConnections
	//   Object.keys(peerConnections).map((socketId) => {
	// 	  this.removeUserStream(socketId)
	// 	  this.closePeer(socketId)
	//   })
	//   mediaSource = {
	// 	  audioChat: false,
	// 	  videoChat: false,
	// 	  screenShare: false,
	//   }

	//   this.updateMediaAction()
	//   this.newState()
	// }

	const joinRoom = () => {
		em.client.enableWebcam();
		em.client.unmuteMic();
		setPeers(peers);

		// setPeers(peers);
		handleClose();
	};
	const handleMicChange = (e) => {
		setSelectedMic(e.target.value);
	};

	return (
		<div>
			<Grid container justify="center">
				<IconButton onClick={handleClose} className={classes.backIconButton}>
					<ArrowBackIosIcon style={{ position: 'absolute', left: '10px' }} />
				</IconButton>
				<Typography variant="h1" className={classes.cameraHeading}>
					Media Devices
				</Typography>
			</Grid>
			<Grid container justify="space-between">
				<Grid item xs={12} sm={5}>
					<div
						style={{ position: 'relative', display: 'table', margin: '0 auto' }}
					>
						<video
							className={
								localStream &&
								localStream.getTracks().find((item) => item.kind === 'video')
									? classes.selectedCameraSec
									: classes.cameraSec
							}
							autoPlay={true}
							id="videoEle"
							// onClick={() => checkHandler('camera')}
						></video>
						{localStream &&
						localStream.getTracks().find((item) => item.kind === 'video') ? (
							<img
								src={'/assets/popula/deviceCheck.png'}
								alt="own-camera"
								className={classes.cameraSecSelected}
							/>
						) : null}
						<Typography variant="body2" className={classes.cameraText}>
							Front camera
						</Typography>
					</div>
				</Grid>
				<Grid item xs={12} sm={5}>
					<div
						className={
							localStream &&
							localStream.getTracks().find((item) => item.kind === 'audio')
								? classes.selectedMicSec
								: classes.micSec
						}
					>
						{localStream &&
						localStream.getTracks().find((item) => item.kind === 'audio') ? (
							<img
								src={'/assets/popula/deviceCheck.png'}
								alt="own-camera"
								className={classes.cameraSecSelected}
							/>
						) : null}
					</div>
					<Typography variant="body2" className={classes.cameraText}>
						Microphone only
					</Typography>
				</Grid>
			</Grid>
			<Grid container justify="center" style={{ margin: '15px' }}>
				<Grid item xs={10}>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						className={classes.micSelect}
						value={selectedMic}
						onChange={handleMicChange}
						input={
							<Input
								id="select-multiple-chip"
								disableUnderline={true}
								style={{ paddingLeft: '15px' }}
							/>
						}
					>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						<MenuItem
							value={'Default - Microphone (Realtek High Definition Audio)'}
						>
							<img src="/assets/icons/microphonbefore.png" alt="mic" />{' '}
							&nbsp;&nbsp;&nbsp;Default - Microphone (Realtek High Definition
							Audio)
						</MenuItem>
						<MenuItem value={'Moving-Neumann TLM 102MT Studio Condenser'}>
							<img src="/assets/icons/microphonbefore.png" alt="mic" />{' '}
							&nbsp;&nbsp;&nbsp;Moving-Neumann TLM 102MT Studio Condenser
							Microphone
						</MenuItem>
						<MenuItem value={'Pressure-Gradient Microphone'}>
							<img src="/assets/icons/microphonbefore.png" alt="mic" />{' '}
							&nbsp;&nbsp;&nbsp;Pressure-Gradient Microphone
						</MenuItem>
						<MenuItem value={'Low-Back Electret Condenser Microphone'}>
							<img src="/assets/icons/microphonbefore.png" alt="mic" />{' '}
							&nbsp;&nbsp;&nbsp;Low-Back Electret Condenser Microphone
						</MenuItem>
					</Select>
				</Grid>
				<Grid item xs={1}>
					<div className={classes.microphoneImg} />
				</Grid>
			</Grid>
			<Grid container justify="center" alignItems="center" spacing={2}>
				<Grid item>
					<Typography variant="body2" className={classes.cameraText}>
						ACOUSTIC ECHO CANCELLATION
					</Typography>
				</Grid>
				<Grid item>
					<AntSwitch
						checked={acousticCheck}
						onChange={() => setAcousticCheck(!acousticCheck)}
						name="checkedC"
					/>
				</Grid>
			</Grid>
			<DialogActions className={classes.actionButtons}>
				<Button
					type="submit"
					variant="contained"
					className={classes.okButton}
					size="large"
					onClick={() =>
						handleJoinRoom(
							localStream &&
								localStream.getTracks().find((item) => item.kind === 'video') &&
								localStream.getTracks().find((item) => item.kind === 'audio') &&
								selectedMic
								? 'PROCEED'
								: 'CLOSE'
						)
					}
				>
					{localStream &&
					localStream.getTracks().find((item) => item.kind === 'video') &&
					localStream.getTracks().find((item) => item.kind === 'audio') &&
					selectedMic
						? 'PROCEED'
						: 'CLOSE'}
				</Button>
			</DialogActions>
		</div>
	);
};

const mapStateToProps = (state) => ({
	selectedRoom: state.room.selectedRoom,
	user: state.auth.user,
	// myPeer: state.room.myPeer,
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			// setMyPeer,
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(CameraSetting);
