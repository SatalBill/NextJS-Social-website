import React, { useState, useRef } from 'react';
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
	InputAdornment,
	Paper,
	Tabs,
	Tab,
	Input,
	Dialog,
} from '@material-ui/core';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Avatar from 'react-avatar';
import { useHistory } from 'react-router-dom';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import { Visibility, MoreVert } from '@material-ui/icons';
import useStyles from '../../styles/roomHeader';
import { imageViewURL } from '../../config';
import { clearLocalStorage, getIsMobile } from '../../utils/localstorage';
import CameraSetting from '../SingleRoom/cameraSettings';
import ChatWindow from '../SingleRoom/chatWindow';
import { setPeers } from '../../redux/actions/room';

const RoomHeader = ({
	selectedRoom,
	user,
	children,
	// setPeers,
	// peer,
	// myPeer,
}) => {
	const [drawerOpen, setDrawerOpen] = useState(true);
	const [chatDrawerOpen, setChatDrawerOpen] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [showCameraSettings, setShowCameraSettings] = useState(false);
	const [peer, setPeers] = useState({});
	// const myPeer = peersList[user && user.userId];
	const [commonGridPeerIds, setCommonGridPeerIds] = useState(new Set());
	const [focusedPeerIds, setFocusedPeerIds] = useState(new Set());
	const [myPeer, setMyPeer] = useState(null);

	const classes = useStyles();
	const history = useHistory();
	const isMobile = getIsMobile();
	// const cameraSetting = useRef();

	// useEffect(() => {
	// 	console.log(cameraSetting.current);
	//   }, [cameraSetting]);

	console.log('*****myPeer*****', myPeer);
	const handleDrawerClose = () => {
		setDrawerOpen(!drawerOpen);
	};
	const handleClose = () => {
		setShowCameraSettings(false);
	};

	const exitRoom = () => {
		if (window.confirm('Are you sure you want to exit room?')) {
			history.push('/dashboard/home');
			// socket.emit("leave-group", { roomId: roomId, user: user });
		}
	};

	const handleFollow = () => {};

	const renderDrawerOpen = () => {
		return (
			<>
				<div
					className={
						drawerOpen ? classes.drawerOpenHeader : classes.drawerCloseHeader
					}
				>
					<img
						src={'/assets/popula/phiz_icon.png'}
						width={drawerOpen ? '154px' : '100px'}
						alt="logo"
					/>
					<IconButton
						onClick={handleDrawerClose}
						className={
							drawerOpen
								? classes.drawerOpenHeaderIcon
								: classes.drawerCloseHeaderIcon
						}
					>
						{drawerOpen ? (
							<ArrowBackIosRoundedIcon className={classes.menuIcon} />
						) : (
							<MenuRoundedIcon className={classes.menuIcon} />
						)}
					</IconButton>
				</div>

				{drawerOpen ? (
					<div style={{ margin: '20px 5px 20px 5px' }}>
						<Input
							id="standard-start-adornment"
							placeholder="Search..."
							className={classes.searchField}
							onChange={(e) => handleSearch(e)}
							disableUnderline={true}
							startAdornment={
								<InputAdornment position="start">
									<SearchIcon style={{ color: '#4e5165' }} />
								</InputAdornment>
							}
						/>
					</div>
				) : (
					<div className={classes.searchMbIcon}>
						<SearchIcon />
					</div>
				)}
				<div style={{ width: '100%' }}>
					{drawerOpen ? (
						<Typography
							variant="h6"
							style={{
								textAlign: 'center',
								textTransform: 'uppercase',
							}}
						>
							Room Users
						</Typography>
					) : null}
				</div>
				<List
					className={drawerOpen ? classes.usersList : classes.usersListMobile}
				>
					{selectedRoom &&
					selectedRoom.RoomUsers &&
					selectedRoom.RoomUsers.length > 0
						? selectedRoom.RoomUsers.map((item, index) => {
								return (
									<ListItem
										className={
											drawerOpen ? classes.listItem : classes.listItemMobile
										}
										key={`selectedRoom_${item.value}`}
									>
										<Avatar
											size={30}
											textSizeRatio={3}
											round={true}
											name={item.user.username}
											src={imageViewURL + item.user.picturePath}
										/>

										{drawerOpen ? (
											<ListItemText
												classes={{
													root: classes.sideNavText,
												}}
												primary={item.user.username}
											/>
										) : null}
										<div className={classes.giftSection}>
											<div className={classes.giftIcon} />
											<div
												className={classes.chatIcon}
												onClick={() => setChatDrawerOpen(!chatDrawerOpen)}
											/>
										</div>
									</ListItem>
								);
						  })
						: null}
				</List>
				<Button
					startIcon={<SettingsIcon style={{ color: '#fff' }} />}
					className={classes.exitButton}
					onClick={() => exitRoom()}
				>
					{drawerOpen ? 'Exit Room' : null}
				</Button>
			</>
		);
	};
	const renderDrawerClose = () => {
		return <div style={{ height: '100px', backgroundColor: 'red' }}></div>;
	};
	const renderWebDrawer = () => {
		return (
			<Drawer
				variant="permanent"
				anchor="left"
				open={drawerOpen}
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: drawerOpen,
					[classes.drawerClose]: !drawerOpen,
				})}
				classes={{
					paper: clsx(classes.drawerPaper, {
						[classes.drawerOpen]: drawerOpen,
						[classes.drawerClose]: !drawerOpen,
					}),
				}}
			>
				{drawerOpen ? renderDrawerOpen() : renderDrawerClose()}
			</Drawer>
		);
	};

	const renderChatDrawer = () => {
		return (
			<Drawer
				variant="permanent"
				anchor="right"
				open={chatDrawerOpen}
				className={clsx(classes.drawer, {
					[classes.chatDrawerOpen]: chatDrawerOpen,
					[classes.chatDrawerClose]: !chatDrawerOpen,
				})}
				classes={{
					paper: clsx(classes.drawerPaper, {
						[classes.chatDrawerOpen]: chatDrawerOpen,
						[classes.chatDrawerClose]: !chatDrawerOpen,
					}),
				}}
			>
				<ChatWindow
					roomId={selectedRoom ? selectedRoom.id : ''}
					// chatType={state.chatType}
					roomUsersList={selectedRoom ? selectedRoom.RoomUsers : []}
					userName={user ? user.username : 'guest'}
					userId={parseInt(user ? user.id : 0)}
				/>
			</Drawer>
		);
	};

	const handleSearch = (e) => {
		setSearchText(e.target.value);
	};

	const UserVideo = React.memo(({ srcObject }) => {
		return (
			<video
				autoPlay
				muted
				style={{
					width: '100%',
					height: '100%',
					objectFit: 'cover',
					objectPosition: 'center',
				}}
				ref={(r) => {
					if (r) {
						r.srcObject = srcObject;
						r.play();
					}
				}}
			></video>
		);
	});

	const UserAudio = React.memo(({ srcObject, muted, volume }) => {
		return (
			<audio
				autoPlay
				ref={(r) => {
					if (r) {
						r.srcObject = srcObject;
						r.volume = volume;
						r.muted = muted;
						r.play();
					}
				}}
			></audio>
		);
	});

	const peers = Array.from(commonGridPeerIds.values()).map((id) => {
		return peer[id];
	});

	return (
		<div>
			{isMobile ? null : renderWebDrawer()}
			<main
				className={
					isMobile
						? null
						: clsx(classes.content1, {
								[classes.contentShift]: drawerOpen,
						  })
				}
			>
				{drawerOpen ? null : (
					<div className={classes.friendListMobile}>
						{renderDrawerOpen(true)}
					</div>
				)}
			</main>
			<main
				className={
					isMobile
						? null
						: clsx(classes.content, {
								[classes.contentShift]: drawerOpen,
								[classes.contentShiftMore]: chatDrawerOpen,
						  })
				}
			>
				<div
					className={
						drawerOpen
							? chatDrawerOpen
								? classes.headerSecWithChat
								: classes.headerSec
							: classes.headerSecClosed
					}
				>
					<Card className={classes.headerCard}>
						<Grid container alignItems="center" justify="space-between">
							<Grid item xs={2} md={1}>
								<Avatar
									size={drawerOpen ? 100 : 40}
									textSizeRatio={3}
									round={true}
									name={user.username}
									src={imageViewURL + user.picturePath}
									className={classes.avatar}
								/>
							</Grid>
							<Grid item xs={6} md={8}>
								<Typography
									gutterBottom
									variant="h6"
									component="h6"
									style={{
										textAlign: 'left',
										margin: '0px',
										textTransform: 'uppercase',
									}}
								>
									{selectedRoom ? selectedRoom.roomName : 'Room Name'}
								</Typography>
								<Typography
									gutterBottom
									variant="body2"
									component="p"
									// style={{ textAlign: 'left', margin: '0px' }}
								>
									{selectedRoom ? selectedRoom.roomDescription : 'Room desc'}
								</Typography>
								<Grid container>
									<Button
										className={classes.followButton}
										variant="contained"
										style={{ marginRight: '10px' }}
										onClick={() => handleFollow(selectedRoom)}
									>
										FOLLOW
									</Button>
									<Button
										className={classes.followButton}
										variant="contained"
										id="share"
									>
										SHARE
									</Button>
								</Grid>
							</Grid>
							<Grid item xs={4} md={3} lg={2}>
								<div>
									<List className={classes.avatarList}>
										{[0, 1, 2, 3, 4, 5, 6].map((item, index) => {
											if (index <= 3) {
												return (
													<Avatar
														key={index}
														size={40}
														textSizeRatio={3}
														round={true}
														name={user.username}
														src={imageViewURL + user.picturePath}
														className={classes.avatarSize}
														style={{
															zIndex: index + 1,
															left: `${index * 25}px`,
														}}
													/>
												);
												//ToDo check length and then add else if of length
											} else if (index === 6) {
												return (
													<img
														key={index}
														src={'/assets/popula/Ellipse 34.svg'}
														width={'40'}
														height={'40'}
														alt=""
														className={classes.plusIcon}
														style={{ zIndex: index + 1, left: '100px' }}
													></img>
												);
											}
										})}
									</List>
								</div>
								<Grid container justify="space-around" alignItems="center">
									<Grid item>
										<div className={classes.usersCount}>5/30</div>
									</Grid>
									<Grid item>
										<div className={classes.usersCount}>
											<Visibility /> 67
										</div>
									</Grid>
									{/* <Grid item>
						<div className={classes.usersCount}>
							5/30
						</div>
					</Grid> */}
								</Grid>
							</Grid>
						</Grid>
					</Card>
				</div>
				<div style={{ padding: '78px 40px 83px 40px' }}>{children}</div>
				<div
					className={
						drawerOpen
							? chatDrawerOpen
								? classes.footerSecWithChat
								: classes.footerSec
							: classes.footerSecClosed
					}
				>
					<Card className={classes.headerCard}>
						<Grid container justify="space-between" alignItems="center">
							<Grid item xs={4}>
								<div
									className={classes.shareButton}
									// onClick={shareBoxShow}
								>
									<div className={classes.shareIcon}></div>
									Share
								</div>
							</Grid>
							<Grid item xs={4}>
								<Button
									className={classes.joinNowButton}
									onClick={() => setShowCameraSettings(true)}
								>
									Join Now
								</Button>
							</Grid>
							<Grid item xs={4} style={{ float: 'right' }}>
								<MoreVert className={classes.moreIcon} />
							</Grid>
						</Grid>
					</Card>
					<div className="own-captuer">
						<div className="own-control-wraper">
							<div className="own-img-wrapper">
								<UserVideo srcObject={myPeer?.video?.stream}></UserVideo>

								<div
									className="own-videoStop pos-ab own-camera"
									style={{
										top: '0',
										left: '0',
										cursor: 'pointer',
										borderRadius: '10px',
									}}
								>
									<div
										className="own-videoStop-icon"
										style={{ width: '80px' }}
									></div>
								</div>
								<div className="selected-emoji-wrapper dn">
									<p className="wave">
										{/* {String.fromCodePoint(this.state.selectedemoji)} */}
									</p>
								</div>
							</div>
							<div
								className="own-mic-mute pos-ab"
								style={{
									top: '10px',
									left: '2px',
									width: '56px',
									height: '53px',
									display: 'none',
								}}
							>
								<img
									src={'/assets/icons/captuer-mute-shawdow.png'}
									style={{ width: '100%', height: '100%' }}
									alt=""
								></img>
							</div>
						</div>
					</div>
				</div>
				<div
					className="horizontal-top user-photo-items"
					style={{ paddingLeft: '20px' }}
				>
					{peers &&
						peers.map((user, i) => {
							return (
								<div
									className="user-face-item pos-re"
									key={i}

									// onMouseLeave={() => {
									// 	document.getElementsByClassName('volume-control-range')[
									// 		i
									// 	].style.display = 'none';
									// }}
								>
									<div
										className="own-img-wrapper"
										// onClick={() => this.add_arr(user)}
									>
										<UserVideo
											srcObject={user && user.video.stream}
										></UserVideo>
										<UserAudio
											srcObject={user && user.audio.stream}
											muted={user && user.muted}
											volume={user && user.volume}
										></UserAudio>
									</div>
									{/* <div
								className={`selected-emoji-wrapper  ${
									this.props.sharedEmoji.filter(
										(item) => item.peer?.id === user.id
									).length
										? ''
										: 'dn'
								}`}
							>
								<p className="wave">
									{this.props.sharedEmoji.filter(
										(item) => item.peer?.id === user.id
									).length
										? String.fromCodePoint(
												this.props.sharedEmoji.filter(
													(item) => item.peer?.id === user.id
												)[0]?.emoji
										  )
										: null}
								</p>
							</div> */}
									{/* <div
								className="chat-control pos-ab hidden-toggle"
								style={{
									display: 'none',
									bottom: '8px',
									justifyContent: 'space-around',
									padding: '0 15px',
								}}
							>
								<img
									src={this.state.vSt}
									alt=""
									style={{ width: '20px' }}
									onClick={() => this.swichHandler('video', i)}
								/>
								<img
									src={this.state.mSt}
									alt=""
									style={{ width: '20px' }}
									onClick={() => {
										this.swichHandler('mute', i);
										this.toggleMute(user);
									}}
								/>
								<img
									src={this.state.voSt}
									alt=""
									style={{ width: '20px' }}
									onClick={() => this.swichHandler('volum', i)}
								/>
							</div> */}
									{/* <div
								className="mic-mute-show pos-ab"
								style={{
									top: '10px',
									left: '10px',
									width: '27px',
									height: '30px',
									display: 'none',
								}}
							>
								<img
									src={'/assets/icons/captuer-mute-shawdow.png'}
									style={{ width: '100%', height: '100%' }}
									alt=""
								></img>
							</div>
							<div
								className="own-videoStop pos-ab"
								style={{ top: '0', left: '0', cursor: 'pointer' }}
								onClick={() => this.showVideo(i)}
							>
								<div
									className="own-videoStop-icon"
									style={{ width: '40px' }}
								></div>
							</div>
							<div
								className="volume-control-range pos-ab"
								style={{ display: 'none' }}
							>
								<div className="slidecontainer">
									<input
										type="range"
										min="1"
										max="100"
										className="sliderA"
										id="myRange"
										value={user.volume * 100}
										onChange={(e) => this.setVolume(e, user)}
									/>
									<img
										src={'/assets/icons/range-back.png'}
										className="range-back"
										alt=""
									></img>
								</div>
							</div> */}
								</div>
							);
						})}
				</div>
			</main>
			{isMobile ? null : renderChatDrawer()}

			<Dialog
				open={showCameraSettings}
				onClose={handleClose}
				classes={{ paper: classes.devicesModal }}
			>
				<CameraSetting
					handleClose={handleClose}
					// selectedRoom={selectedRoom}
					// user={user}
					setPeers={setPeers}
					peers={peer}
					// peersList={peer}
					// ref={cameraSetting}
					setCommonGridPeerIds={setCommonGridPeerIds}
					commonGridPeerIds={commonGridPeerIds}
					setFocusedPeerIds={setFocusedPeerIds}
					focusedPeerIds={focusedPeerIds}
					setMyPeer={setMyPeer}
					myPeer={myPeer}
				/>
			</Dialog>
		</div>
	);
};

const mapStateToProps = (state) => ({
	selectedRoom: state.room.selectedRoom,
	user: state.auth.user,
	// peer: state.room.peer,
	// myPeer: state.room.myPeer,
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			// setPeers,
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(RoomHeader);
