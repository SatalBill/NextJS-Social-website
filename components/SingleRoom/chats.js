import React, { useState, useRef, useEffect } from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
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
import moment from 'moment';
import ChatShareItems from './chatShareItems';
import config from '../../config';
import * as generalRequest from '../../redux/sagas/Requests/generalRequest';
import useStyles from '../../styles/chat';

import $ from 'jquery';
import Avatar from 'react-avatar';
let socket = config.socket;
let shareType = '';
let messageArray = [];

const Chats = ({
	messages,
	roomId,
	userId,
	friend,
	sendMessage,
	windowType,
}) => {
	const [message, setMessage] = useState('');
	const bottomRef = useRef(null);
	const classes = useStyles();

	useEffect(() => {
		scrollToRef(bottomRef);
	}, []);

	const scrollToRef = (ref) => {
		window.scrollTo(0, ref.current.offsetTop);
	};

	const sendNewMessage = (type, fileValue) => {
		let messageObj = {
			roomId: roomId,
			message: fileValue || message.trim(),
			senderId: userId,
			messageType: type || 'text',
		};
		if (messageObj.message !== '' && messageObj.message) {
			if (windowType === 'private') {
				messageObj = {
					...messageObj,
					receiverId: friend.id,
					read: false,
				};
			}
			setMessage('');
			handleTyping(false, true);
			sendMessage(messageObj);
		}
	};
	const handleTyping = (isTyping) => {
		let payload = {
			isTyping,
			roomId: roomId,
		};
		// handleTyping(payload)
		if (windowType === 'private') {
			payload.receiverId = friend?.id;
			socket.emit('user-typing-action', payload);
		} else {
			socket.emit('user-typing-action', payload);
		}
	};

	const handleFileShare = (payload) => {
		let { type, files } = { ...payload };
		showPopup();
		let formdata = new FormData();
		formdata.append('folderPath', 'chat');
		formdata.append('files', files[0]);

		generalRequest.uploadFiles(formdata).then((res) => {
			if (res.status === 200) {
				let uploadFilePath = res.data?.message[0];
				sendNewMessage(type, uploadFilePath);
			}
		});
	};

	const showPopup = () => {
		$('.share-chat-item-wraper').slideToggle();
		$('.full-background').toggle();
	};

	// componentDidMount() {
	// 	handleMessageScroll();
	// }
	const handleMessageType = (message) => {
		let msg = message.message;
		message.messageType = message.messageType || 'text';
		message.messageType = message.messageType?.toLowerCase();
		if (message.messageType === 'image') {
			return (
				<img
					src={config.imageViewURL + message.message}
					className="chat-image"
				></img>
			);
		} else if (message.messageType === 'video') {
			return (
				<div className="chat-video">
					<video
						src={config.imageViewURL + message.message}
						className=""
						controls
					></video>
				</div>
			);
		} else if (message.messageType === 'file') {
			return (
				<iframe
					src={config.imageViewURL + message.message}
					className="chat-file"
				></iframe>
			);
		} else if (message.messageType === 'audio') {
			return (
				<audio
					src={config.imageViewURL + message.message}
					controls
					className="chat-audio"
				></audio>
			);
		}

		return msg;
	};
	console.log('messages', messages);
	return (
		<div>
			{/* <div
				style={{
					maxheight: '90vh',
					overFlowY: 'scroll',
				}}
				// className="chatbot-content fit-screen "
			> */}
			<div
				// className={'chats ' + (windowType === 'group' ? ' vh85' : '')}
				style={{ height: '85vh' }}
				// id="room-conversation"
				ref={bottomRef}
			>
				{messages &&
					messages.map((message, i) =>
						parseInt(message.senderId) === parseInt(userId) ? (
							<div key={index}>
								<Grid container justify="flex-end">
									<span style={{ display: 'flex', alignItems: 'center' }}>
										<MoreHorizIcon></MoreHorizIcon>
									</span>
									<span className="u2 chat">{handleMessageType(message)}</span>
								</Grid>
								<div className="own-chat-under-line">
									<div className="u2-under-line">
										<div className="send-time">
											{moment(message.createdAt).format('LLL')}
										</div>
									</div>
								</div>
							</div>
						) : (
							<span key={i}>
								<div className="chat-line">
									{windowType === 'group' ? (
										<span
											className=" mr-3"
											style={{ width: '40px', height: '40px' }}
										>
											<Avatar
												size={30}
												textSizeRatio={3}
												round={true}
												name={message.sender.username}
												src={config.imageViewURL + message.sender.picturePath}
											/>
										</span>
									) : null}
									<span className="u1 chat pos-re">
										{windowType === 'group' ? (
											<span className="wirter-name">
												{(message.sender && message.sender.username) ||
													'User Name Here'}
											</span>
										) : null}

										{handleMessageType(message)}
									</span>
									<span style={{ display: 'flex', alignItems: 'center' }}>
										<MoreHorizIcon></MoreHorizIcon>
									</span>
								</div>
								<div className="chat-under-line">
									<div className="send-time">
										{moment(message.createdAt).format('LLL')}
									</div>
								</div>
							</span>
						)
					)}
			</div>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					sendNewMessage();
				}}
				className={classes.messageInput}
			>
				<Grid
					container
					direction="row"
					justify="space-between"
					alignItems="center"
				>
					<ChatShareItems closeModel={(payload) => handleFileShare(payload)} />
					<Grid item xs={2}>
						<img
							src={'/assets/icons/small-plus.svg'}
							alt="phiz icon"
							onClick={(e) => {
								showPopup('group');
							}}
							style={{ paddingTop: '4px' }}
						></img>
					</Grid>
					<Grid item xs={8}>
						<input
							id="message"
							value={message}
							onKeyPress={() => handleTyping(true)}
							onBlur={() => handleTyping(false)}
							onChange={(e) => {
								setMessage(e.target.value);
							}}
							placeholder="Type a message..."
							required=""
							minLength="1"
							maxLength="1500"
							className={classes.input}
						/>
					</Grid>
					<Grid item xs={2}>
						<img
							onClick={(e) => {
								e.preventDefault();
								sendNewMessage();
							}}
							src={'/assets/icons/messageSend.svg'}
							alt="phiz icon"
							style={{ paddingTop: '4px' }}
						></img>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

export default Chats;
