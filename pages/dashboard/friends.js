import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid } from '@material-ui/core';
import FriendSidebar from '../../components/Friends/sidebar';
import FriendHeaderCard from '../../components/Friends/friendHeaderCard';
// import MessageChat from '../../build/ui-mchat';
// import VideoChat from '../../build/video-call';
// import FriendsGame from '../../firendRoom/friendsGame';
// import * as usersAction from '../../../redux/actions/users';
import * as chatRequest from '../../redux/sagas/Requests/chatRequest';
import Config from '../../config';
import ChatWindow from '../../components/Custom/chatWindow';
import UserStatus from '../../components/Friends/userStatus';
import * as _ from 'lodash';
import { getLocalStorage } from '../../utils/localstorage';
import useStyles from '../../styles/friends';

let socket = Config.socket;
// let userId;
const Friends = ({ myProfile, history, userList, user, token }) => {
	const [selectedTab, setSelectedTab] = useState('');
	const [precontentState, setPrecontentState] = useState(true);
	const [messageState, setMessageState] = useState(false);
	const [friendsGameState, setFriendsGameState] = useState(false);
	const [videoCallState, setVideoCallState] = useState(false);
	const [f_name, setf_name] = useState('');
	const [roomId, setRoomId] = useState(-1);
	const [senderId, setSenderId] = useState(-1);
	const [typing, setTyping] = useState(false);
	const [messageData, setMessageData] = useState('');
	const [exitCall, setExitCall] = useState(false);
	const [roomMessages, setRoomMessages] = useState([]);
	const [hide, setHide] = useState(false);
	const [friend, setFriend] = useState(null);
	const classes = useStyles();

	useEffect(() => {
		// myProfile = this.props.myProfile;
		// userId = getLocalStorage('userId');
		socket.on('user-typing-action', (payload) => {
			if (typing !== payload.typing) {
				setTyping(payload.typing);
				// this.setState({ typing: payload.typing });
			}
		});
		const messageObj = {
			roomId: '1_2',
			message: 'hi',
			senderId: 2,
			messageType: 'text',
			receiverId: 1,
		};
		socket.on('new-private-message', messageObj); //=> {
		// 	console.log('messageObj 111---->"', messageObj);
		// 	// addMessageObj(messageObj);
		// });

		// let params = history.location.state || {};
		// if (params.otherUser) {
		// 	joinFriendRoom(params.otherUser);
		// }

		// socket.on('callEnded', (payload) => {
		// 	// console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
		// 	getEndState('fr_callend');
		// 	window.location.reload();
		// });
	}, []);

	const sendMessage = (msgObj) => {
		console.log('msgObj ---->"', msgObj);
		socket.emit('send-private-message', msgObj);
		// , function (a) {
		// 	console.log('********', a);
		// handleStartAction(false);
		// addMessageObj(messageObj);
		// });
		// socket.on('new-private-message', (messageObj) => {
		// 	console.log('messageObj ---->"', messageObj);
		// 	addMessageObj(messageObj);
		// });
		// socket.on('highlight-private-room', (messageObj) => {
		// 	console.log('messageObj ---->"', messageObj);
		// 	addMessageObj(messageObj);
		// });
		socket.on('new-private-message', function (data) {
			// receiveMessage(data)
			console.log('data', data);
		});
	};
	socket.on('new-private-message', (messageObj) => {
		console.log('messagaaaaaeObj ---->"', messageObj);
		addMessageObj(messageObj);
	});
	const addMessageObj = (messageObj) => {
		console.log('messageObj"', messageObj);

		setRoomMessages([...roomMessages, messageObj]);
		//Todo- scrolling
		// this.setState(
		// 	{ roomMessages: [...this.state.roomMessages, messageObj] },
		// 	() => {
		// 		this.handleMessageScroll();
		// 	}
		// );
	};

	const findRoomId = (firstUserId, secondUserId) => {
		if (firstUserId < secondUserId) {
			return firstUserId + '_' + secondUserId;
		} else {
			return secondUserId + '_' + firstUserId;
		}
	};

	const joinFriendRoom = (friend, roomMessages) => {
		if (friend) {
			socket.emit('leave-private-room', {
				roomId: roomId,
				user: myProfile.id,
			});

			let roomId = findRoomId(friend.id, myProfile.id);
			socket.emit('join-private-room', {
				roomId,
				user: myProfile.id,
			});

			chatRequest.getRoomMessages(roomId).then((res) => {
				if (res.status === 200) {
					setRoomMessages(res.data.data);
				}
				setPrecontentState(false);
				setVideoCallState(false);
				setMessageState(true);
				setf_name(friend.username);
				setFriend(friend);
				setRoomId(roomId);
			});
		}
	};

	const parentCallback = (come_txt) => {
		if (come_txt === 'vc') {
			setVideoCallState(true);
			setMessageState(false);
			setExitCall(false);
			setHide(false);
			setRoomId(roomId);
		}
	};

	const acceptCall = (roomId) => {
		console.log('acceptCall in friend:  ', roomId);
		setVideoCallState(true);
		setMessageState(false);
		setPrecontentState(false);
		setHide(false);
		setRoomId(roomId);
		setExitCall(false);
	};
	const getEndState = (come_end) => {
		if (come_end !== '') {
			console.log('getEndState', come_end);
			setPrecontentState(false);
			setMessageState(true);
			setVideoCallState(false);
		}
	};

	const handleMessageScroll = () => {
		let conversationElement = document.getElementById('room-conversation');
		if (conversationElement) {
			conversationElement.scrollTop = conversationElement.scrollHeight + 100;
			setTimeout(() => {
				conversationElement.scrollTop = conversationElement.scrollHeight + 100;
			}, 400);

			let messageDoc = document.getElementById('message');
			messageDoc.focus();
		}
	};
	const handleTyping = (payload) => {
		payload.receiverId = friend.id;
		socket.emit('user-typing-action', payload);
	};

	return (
		<div className={classes.frindContent} style={{ display: 'flex' }}>
			<FriendSidebar
				joinFriendRoom={(friend, roomMessages) =>
					joinFriendRoom(friend, roomMessages)
				}
				setSelectedTab={setSelectedTab}
				selectedTab={selectedTab}
			/>
			<div className={classes.friendcontainer}>
				{/* <div> */}
				<FriendHeaderCard
					fName={f_name}
					friends={userList}
					friend={friend}
					roomId={roomId}
					parentCallback={parentCallback}
					acceptCall={acceptCall}
					exitCall={exitCall}
					setSelectedTab={setSelectedTab}
					selectedTab={selectedTab}
				/>
				{/* </div> */}
				{/* <div className="fr-main" id="frMain">
					<div className="fr-main-container pos-re ml43px"> */}
				{/* <div> */}
				{selectedTab === '' && (
					<Grid
						container
						justify="center"
						alignItems="center"
						direction="column"
						style={{ height: '89vh' }}
					>
						<img src={'/assets/popula/welcome.png'} alt="fr-welcome"></img>

						<h3 className="mt-3" style={{ color: '#ff8300' }}>
							GET CONNECTED WITH YOUR FRIENDS
							<br />
							&#38; LOVE ONES
						</h3>
					</Grid>
				)}
				{selectedTab === 'status' && (
					<UserStatus
					// handleTyping={(isTyping) => handleTyping(isTyping)}
					// userId={parseInt(userId)}
					// friend={friend}
					// roomId={roomId}
					// windowType="private"
					// chatWindowHeight="86vh"
					// sendMessage={sendMessage}
					// messages={roomMessages}
					/>
				)}
				{selectedTab === 'chat' && (
					<ChatWindow
						handleTyping={(isTyping) => handleTyping(isTyping)}
						userId={parseInt(user && user.id)}
						friend={friend}
						roomId={roomId}
						windowType="private"
						chatWindowHeight="86vh"
						sendMessage={sendMessage}
						messages={roomMessages}
					/>
				)}

				{/* {videoCallState && (
									<VideoChat
										friend={this.state.friend}
										hide={this.state.hide}
										fr_videoCall={this.state.roomId}
										pCall={this.getEndState}
									/>
								)} */}
				{/* {friendsGameState && (
									<FriendsGame
										history={this.props.history}
										teamData={this.props.location.state}
									/>
								)} */}
			</div>
		</div>
		// </div>
		// 	</div>
		// </div>
	);
	// }
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
	loading: state.room.loading,
	token: state.auth.token,

	userList: state.users.usersList,
	myProfile: state.auth.user,
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			//
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
