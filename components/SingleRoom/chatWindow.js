import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	makeStyles,
	AppBar,
	Tabs,
	Tab,
	Box,
	Input,
	InputAdornment,
	Typography,
	List,
	ListItem,
	ListItemText,
	Grid,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import $ from 'jquery';
import config from '../../config';
import { getRoomMessages } from '../../redux/sagas/Requests/roomRequest';
import Avatar from 'react-avatar';
import * as chatRequest from '../../redux/sagas/Requests/chatRequest';
import Chats from './chats';
import * as _ from 'lodash';
import useStyles from '../../styles/chat';
import { imageViewURL } from '../../config';

let socket = config.socket;
let fileFor = '';
let tempMessages = [];
function TabPanel(props) {
	const { children, value, index, chatType, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box>
					<div className="pos-re promote-chat" style={{ height: '93vh' }}>
						{children}
					</div>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

let tempPrivateMessages = [];

const ChatWindow = ({ roomId, userId, roomUsersList }) => {
	const classes = useStyles();
	const [value, setValue] = useState(0);
	const [showUserList, setShowUserList] = useState(false);
	let [privateMessageBox, setPrivateMessageBox] = useState('');
	let [messages, setMessages] = useState('');
	let [privateMessages, setPrivateMessages] = useState('');
	const [flag, setFlag] = useState(true);
	const [friend, setFriend] = useState(true);
	const [typingUsers, setTypingUsers] = useState([]);
	const [typing, setTyping] = useState(true);
	const [privateChatRoomId, setPrivateChatRoomId] = useState(0);

	// let [state, setState] = useState({
	// 	friend: {},
	// 	typingUsers: [],
	// 	typing: false,
	// 	privateChatRoomId: 0,
	// });
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const a11yProps = (index) => {
		// setChatType(index)
		handleMessageScroll();

		return {
			id: `simple-tab-${index}`,
			'aria-controls': `simple-tabpanel-${index}`,
		};
	};

	// a11yProps(props.chatType)
	useEffect(() => {
		getRoomMessages(roomId)
			.then((res) => {
				if (res.status === 200) {
					pushMessage(res.data.data);
				}
			})
			.catch((e) => {
				console.log(e);
			});

		socket.on('new-private-message', (messageObj) => {
			pushPrivateMessage([messageObj]);
		});
	}, []);

	useEffect(() => {
		socket.on('new-group-message', (payload) => {
			pushMessage([payload]);
		});
	}, []);

	const pushMessage = (messageArray) => {
		tempMessages = [...tempMessages, ...messageArray];
		setMessages(tempMessages);
		handleMessageScroll();
	};

	const pushPrivateMessage = (messageObj) => {
		tempPrivateMessages = [...tempPrivateMessages, ...messageObj];
		setPrivateMessages(tempPrivateMessages);
		handleMessageScroll();
	};
	const handleModal = () => {
		setShowUserList(true);
		// if (flag) {
		// 	$('.select-arrow-icon').css('transform', 'rotate(180deg)');
		// } else {
		// 	$('.select-arrow-icon').css('transform', 'rotate(0deg)');
		// }
		// $('.hidden-item-list').slideToggle();
		// setFlag(!flag);
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

	// const sendMessage = (message) => {
	// 	if (message) {
	// 		socket.emit('sent-group-message', message, (err, messageObj) => {
	// 			pushMessage([messageObj]);
	// 		});
	// 	}
	// };
	const sendPrivateMessageBox = (message) => {
		socket.emit('send-private-message', message, (messageObj) => {
			pushPrivateMessage([messageObj]);
		});
	};

	const handleStartAction = (typing, isGroup) => {
		// let { userId, roomId } = { ...props };
		if (isGroup) {
			socket.emit('group-typing-action', {
				typing,
				senderId: userId,
				roomId,
			});
		} else {
			socket.emit('typing-action', {
				typing,
				senderId: userId,
				receiverId: friend.id,
				roomId,
			});
		}
	};

	const findRoomId = (firstUserId, secondUserId) => {
		if (firstUserId < secondUserId) {
			return firstUserId + '_' + secondUserId;
		} else {
			return secondUserId + '_' + firstUserId;
		}
	};

	const joinPrivateRoom = (friend) => {
		if (friend) {
			// socket.emit("leave room", { roomName: privateChatRoomId })
			let roomId = findRoomId(friend.id, userId);
			setState({ ...state, privateChatRoomId: roomId, friend: friend });

			socket.emit('join room', { roomId });
			chatRequest.getRoomMessages(roomId).then((res) => {
				if (res.status === 200) {
					pushPrivateMessage(res.data.data);
					handleMessageScroll();
					handleModal();
				}
			});
		}
	};
	// useEffect(()=> {
	//   if(props.socket){
	//     props.socket.on("newRoomMessage", message => {

	//       setMessages(preMessages => ([...preMessages, message]))
	//     })
	//   }
	// },[])
	const handleUserTyping = () => {
		let userList = typingUsers;
		if (typingUsers.length > 1) {
			userList = [typingUsers[0], typingUsers[0]];
		}
		return userList.map((user, index) => (
			<span className="ml-1">{user.name ? user.name : user.username}</span>
		));
	};
	const showPopup = (filefor) => {
		fileFor = filefor;
		$('.share-chat-item-wraper').slideToggle();
		$('.full-background').toggle();
	};

	// const closeModel = (payload) => {
	//   let { type, files } = { ...payload }

	//   let formdata = new FormData()
	//   formdata.append('folderPath', "chat")
	//   formdata.append('files', files[0])

	//   generalRequest.uploadFiles(formdata).then(res => {
	//     if (res.status === 200) {
	//       let uploadFilePath = res.data?.message[0]
	//       if (fileFor) {
	//         showPopup()
	//       }
	//       if (fileFor === "private") {
	//         sendPrivateMessageBox(type, uploadFilePath)
	//       } else {
	//         sendMessage(type, uploadFilePath)
	//       }
	//     }
	//   })
	// }

	return (
		<div className={classes.root}>
			{/* <AppBar position="static" color="secondary"> */}
			<Tabs
				value={value}
				onChange={handleChange}
				aria-label="simple tabs example"
			>
				<Tab
					className={value === 0 ? classes.selectedTab : classes.unselectedTab}
					label={
						<Grid container>
							<img src="/assets/others/icon-messge.svg" alt="chat-icon" />
							<Typography
								variant="h6"
								className={
									value === 0 ? classes.selectedTabName : classes.tabName
								}
							>
								Public
							</Typography>
						</Grid>
					}
					onClick={() => a11yProps(0)}
				/>
				<Tab
					className={value === 1 ? classes.selectedTab : classes.unselectedTab}
					label={
						<Grid container>
							<img src="/assets/others/icon-messge.svg" alt="chat-icon" />
							<Typography
								variant="h6"
								className={
									value === 1 ? classes.selectedTabName : classes.tabName
								}
							>
								Private
							</Typography>
						</Grid>
					}
					onClick={() => a11yProps(1)}
				/>
			</Tabs>
			{/* </AppBar> */}

			<TabPanel value={value} index={0}>
				<Chats
					userId={userId}
					roomId={roomId}
					windowType="group"
					sendMessage={(msg) => sendMessage(msg)}
					messages={messages}
				/>
			</TabPanel>

			<TabPanel value={value} index={1}>
				{/* <div className="chat-headers"> */}
				<div style={{ margin: '20px 5px 20px 5px' }}>
					<Input
						id="standard-start-adornment"
						placeholder="Type Username"
						className={classes.searchField}
						// onChange={(e) => handleSearch(e)}
						disableUnderline={true}
						endAdornment={
							<InputAdornment position="end">
								<ExpandMoreIcon
									style={{ color: '#4e5165' }}
									onClick={() => handleModal()}
								/>
							</InputAdornment>
						}
					/>
					{/* {showUserList ? (
						<List className={classes.usersList}>
							{roomUsersList && roomUsersList.length > 0
								? roomUsersList.map((item, index) => {
										return (
											<ListItem
												className={classes.listItem}
												key={`selectedRoom_${item.value}`}
												onClick={() => joinPrivateRoom(item.user)}
											>
												<Avatar
													size={30}
													textSizeRatio={3}
													round={true}
													name={item.user.username}
													src={imageViewURL + item.user.picturePath}
												/>

												<ListItemText
													classes={{
														root: classes.sideNavText,
													}}
													primary={item.user.username}
												/>
											</ListItem>
										);
								  })
								: null}
						</List>
					) : null} */}
				</div>

				{/* {!_.isEmpty(friend) ? (
					<div className="friend-name-pad">
						<span className="ml-2">
							<Avatar
								size={30}
								textSizeRatio={3}
								round={true}
								name={friend.username}
								src={config.imageViewURL + friend.picturePath}
							/>
							<span className="ml-2">
								{friend.username} {typing && <span>typing...</span>}{' '}
							</span>
						</span>
						<hr></hr>
					</div>
				) : null} */}

				<Chats
					userId={userId}
					friend={friend}
					roomId={privateChatRoomId}
					windowType="private"
					sendMessage={(msg) => sendPrivateMessageBox(msg)}
					messages={privateMessages}
				/>
			</TabPanel>
		</div>
	);
};
export default ChatWindow;
