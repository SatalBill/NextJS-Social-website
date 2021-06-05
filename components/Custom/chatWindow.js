import React, { useState, useRef, useEffect } from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { Grid, Input } from '@material-ui/core';
import ChatShareItems from '../build/chatShareItems/index';
import config from '../../config';
import * as generalRequest from '../../redux/sagas/Requests/generalRequest';
import $ from 'jquery';
import Avatar from 'react-avatar';
import useStyles from '../../styles/friends';

let socket = config.socket;

const ChatWindow = ({
	messages,
	userId,
	chatWindowHeight,
	windowType,
	roomId,
	friend,
	sendMessage,
}) => {
	const [message, setMessage] = useState('');
	const [showShareModal, setShowShareModal] = useState(false);

	const messageEl = useRef(null);
	let classes = useStyles();

	useEffect(() => {
		if (messageEl) {
			messageEl.current.addEventListener('DOMNodeInserted', (event) => {
				const { currentTarget: target } = event;
				target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
			});
		}
	}, []);

	// const handleMessageScroll = () => {
	// 	let conversationElement = document.getElementById('room-conversation');
	// 	if (conversationElement) {
	// 		conversationElement.scrollTop = conversationElement.scrollHeight + 100;
	// 		setTimeout(() => {
	// 			conversationElement.scrollTop = conversationElement.scrollHeight + 100;
	// 		}, 400);
	// 		let messageDoc = document.getElementById('message');
	// 		messageDoc.focus();
	// 	}
	// };
	// componentDidUpdate(prevProps, state) {
	// 	if (messages.length !== prevProps.messages.length) {
	// 		this.handleMessageScroll();
	// 	}
	// }
	const handleSendMessage = (type, fileValue) => {
		let messageObj = {
			roomId,
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
		//handleTyping(payload)
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
				handleSendMessage(type, uploadFilePath);
			}
		});
	};
	const showPopup = () => {
		// $('.share-chat-item-wraper').slideToggle();
		// $('.full-background').toggle();
	};

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
	return (
		<div className="">
			<div
				style={{
					maxheight: '90vh',
					overFlowY: 'scroll',
				}}
				className="chatbot-content fit-screen "
			>
				<div
					className={'chats ' + (windowType === 'group' ? ' vh85' : '')}
					style={{ height: chatWindowHeight }}
					id="room-conversation"
					ref={messageEl}
				>
					{messages &&
						messages.map((message, i) =>
							parseInt(message.senderId) === parseInt(userId) ? (
								<div key={i}>
									{' '}
									<div className="chat-line own-chat mt-0">
										<span style={{ display: 'flex', alignItems: 'center' }}>
											<MoreHorizIcon></MoreHorizIcon>
										</span>
										<span className="u2 chat">
											{handleMessageType(message)}
										</span>
									</div>
									<div className="own-chat-under-line">
										<div className="u2-under-line">
											<div className="send-time">
												{moment(message.createdAt).format('LLL')}
											</div>
										</div>
									</div>
								</div>
							) : (
								<div key={i}>
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
									</div>{' '}
								</div>
							)
						)}
				</div>
			</div>
			<Grid
				container
				justify="space-between"
				alignItems="center"
				className={classes.chatFooter}
			>
				<Grid item xs={2}>
					<img
						src={'/assets/icons/small-plus.svg'}
						alt="phiz icon"
						onClick={() => setShowShareModal(true)}
					></img>
					{showShareModal ? (
						<ChatShareItems
							closeModel={(payload) => this.handleFileShare(payload)}
						/>
					) : null}
				</Grid>
				<Grid item xs={8}>
					<Input
						id="message"
						value={message}
						onKeyPress={() => handleTyping(true)}
						onBlur={() => handleTyping(false)}
						onChange={(e) => {
							setMessage(e.target.value);
							// this.setState({ message: e.target.value });
						}}
						placeholder="Type a message..."
						className={classes.messageField}
						disableUnderline={true}
						// minLength="1"
						// maxLength="1500"
					/>
				</Grid>
				<Grid item xs={2}>
					<img
						onClick={(e) => {
							e.preventDefault();
							handleSendMessage();
						}}
						src={'/assets/icons/messageSend.svg'}
						alt="phiz icon"
					></img>
				</Grid>
			</Grid>
		</div>
	);
	// }
};

export default ChatWindow;
