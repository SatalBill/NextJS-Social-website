// import React, { Component } from "react";
// // import Popup from 'react-popup';
// import SearchBox from "../build/ui-search";
// import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
// import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
// import { withRouter } from "react-router-dom";
// import * as actionTypes from "../../redux/actionTypes";
// import { CircularProgress } from "@material-ui/core";

// import FriendList from "./friendList";
// import $ from "jquery";
// import { connect } from "react-redux";
// import * as userRequest from "../../redux/sagas/Requests/userRequest";
// // import history from "../../handler/history.handler";
// import config from "../../config";
// import * as _ from "lodash";
// import { getLocalStorage } from "../../utils/localstorage";

// let socket = config.socket;
// let userId = "";
// export class sidebar extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       leftSidebarState: true,
//       sendleftState: "",
//       friendList: [],
//       showLoader: true,
//       onlineUserIds: [],
//     };
//     this.handleLeftSidebar = this.handleLeftSidebar.bind(this);
//     // this.ch = this.ch.bind(this)
//   }

//   componentDidMount() {
//     userId = getLocalStorage("userId");
//     userId = userId ? parseInt(userId) : null;

//     this.getFriendsList();
//     this.setState({ sendleftState: this.state.leftSidebarState });
//   }

//   handleLeftSidebar() {
//     var leftsidebar = document.getElementById("fr-sidebar");
//     var friendcontainer = document.getElementsByClassName("friendcontainer")[0];
//     this.setState({ leftSidebarState: !this.state.leftSidebarState }, () => {
//       if (!this.state.leftSidebarState) {
//         leftsidebar.style.width = "100px";
//         leftsidebar.style.background = "transparent";
//         friendcontainer.style.marginLeft = "100px";
//         $(".fr-list-body").addClass("rs-fr-list-body");
//       } else {
//         leftsidebar.style.width = "320px";
//         leftsidebar.style.background = "#2C2F44";
//         friendcontainer.style.marginLeft = "332px";
//         $(".fr-list-body").removeClass("rs-fr-list-body");
//       }
//     });
//   }

//   getFriendsList = async () => {
//     this.setState({
//       showLoader: true,
//     });
//     userRequest.getFriendsList().then(res => {
//       if (res && res.status === 200) {
//         this.setState({
//           friendList: res.data.data,
//         });
//       }
//       this.setState({
//         showLoader: false,
//       });
//     });

//     // this.props.getFriendsList()
//   };

//   //ON SELECT EVENT HANDLER FUNCTION
//   showUserList = () => {
//     this.props.history.push("/dashboard/user-management", {
//       searchUser: "Friends",
//     });
//   };
//   joinFriendRoom = (otherUser, roomMessages) => {
//     this.props.joinFriendRoom(otherUser, roomMessages);
//   };
//   checkIsOnline = userId => {
//     let findId = _.find(
//       this.state.onlineUserIds,
//       id => parseInt(id) === parseInt(userId)
//     );
//     return findId;
//   };
//   render() {
//     const { leftSidebarState, showLoader } = { ...this.state };
//     return (
//       <div className="f-side-body" id="fr-sidebar">
//         <div className="f-side-header pos-re">
//           <div
//             className={
//               this.state.leftSidebarState
//                 ? "fr-search-wrapper"
//                 : "rs-fr-search-wrapper"
//             }
//           >
//             <SearchBox />
//           </div>
//           <div
//             className={
//               this.state.leftSidebarState
//                 ? "so-icon-wrapper mb-3"
//                 : "rs-so-icon-wrapper"
//             }
//           >
//             <div className="s-d-icon c-pointer"></div>
//             <div className="s-m-icon c-pointer"></div>
//             <span
//               className="s-p-icon c-pointer"
//               onClick={e => this.showUserList()}
//             ></span>
//           </div>

//           <button
//             className={
//               leftSidebarState
//                 ? "size-reduce-btn"
//                 : "size-reduce-btn rs-size-reduce-btn"
//             }
//             onClick={this.handleLeftSidebar}
//           >
//             {leftSidebarState ? (
//               <ArrowBackIosRoundedIcon className="arrow-back-icon" />
//             ) : (
//               <MenuRoundedIcon className="arrow-back-icon" />
//             )}
//           </button>
//         </div>
//         {showLoader ? (
//           <CircularProgress
//             size={40}
//             style={{
//               color: "#fff",
//             }}
//             className="sidemenu-loader-center"
//           />
//         ) : (
//           <FriendList
//             onlineUserIds={this.state.onlineUserIds}
//             joinFriendRoom={(otherUser, roomMessages) =>
//               this.joinFriendRoom(otherUser, roomMessages)
//             }
//             friendList={this.state.friendList}
//           />
//         )}
//       </div>
//     );
//   }
// }

// function mapStateToProps(state) {
//   return {};
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     // getFriendsList: (payload) => { return dispatch({ type: actionTypes.FRIENDS_LIST, payload }) },
//   };
// }

// export default withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(sidebar)
// );

import React, { useState, useEffect } from 'react';
// import Popup from 'react-popup';
import SearchBox from '../build/ui-search';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import {} from '../../redux/actions/room';
import {
	CircularProgress,
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
import { bindActionCreators } from 'redux';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';

import FriendList from './friendList';
import $ from 'jquery';
import { connect } from 'react-redux';
import * as userRequest from '../../redux/sagas/Requests/userRequest';
// import history from "../../handler/history.handler";
import Config from '../../config';
import * as _ from 'lodash';
import { getLocalStorage, getIsMobile } from '../../utils/localstorage';
import useStyles from '../../styles/friends';
import { getMyFriendList } from '../../redux/actions/friends';

let socket = Config.socket;

// let userId = '';
const Sidebar = ({
	user,
	loading,
	token,
	getMyFriendList,
	myFriends,
	joinFriendRoom,
	selectedTab,
	setSelectedTab,
}) => {
	const [leftSidebarState, setLeftSidebarState] = useState(true);
	const [drawerOpen, setDrawerOpen] = useState(true);
	const [searchText, setSearchText] = useState('');
	const [sendleftState, setSendleftState] = useState('');
	const [friendList, setFriendList] = useState([]);
	const [showLoader, setShowLoader] = useState(true);
	const [onlineUserIds, setOnlineUserIds] = useState([]);
	const classes = useStyles();
	const history = useHistory();
	const isMobile = getIsMobile();

	useEffect(() => {
		if (myFriends && myFriends.length === 0) {
			getMyFriendList(token);
		}
	}, []);

	// useEffect(() => {
	// 	userId = getLocalStorage('userId');
	// 	userId = userId ? parseInt(userId) : null;

	// 	// getFriendsList();
	// 	// setSendleftState(leftSidebarState);
	// 	// this.setState({ sendleftState: this.state.leftSidebarState });
	// }, []);

	const handleDrawerClose = () => {
		setDrawerOpen(!drawerOpen);
	};
	const handleSearch = (e) => {
		setSearchText(e.target.value);
	};

	// constructor(props) {
	//   super(props);
	//   this.state = {
	//     leftSidebarState: true,
	//     sendleftState: "",
	//     friendList: [],
	//     showLoader: true,
	//     onlineUserIds: [],
	//   };
	//   this.handleLeftSidebar = this.handleLeftSidebar.bind(this);
	//   // this.ch = this.ch.bind(this)
	// }

	// componentDidMount() {
	//   userId = getLocalStorage("userId");
	//   userId = userId ? parseInt(userId) : null;

	//   this.getFriendsList();
	//   this.setState({ sendleftState: this.state.leftSidebarState });
	// }

	const handleLeftSidebar = () => {
		var leftsidebar = document.getElementById('fr-sidebar');
		var friendcontainer = document.getElementsByClassName('friendcontainer')[0];
		setLeftSidebarState(!leftSidebarState),
			() => {
				if (!leftSidebarState) {
					leftsidebar.style.width = '100px';
					leftsidebar.style.background = 'transparent';
					friendcontainer.style.marginLeft = '100px';
					$('.fr-list-body').addClass('rs-fr-list-body');
				} else {
					leftsidebar.style.width = '320px';
					leftsidebar.style.background = '#2C2F44';
					friendcontainer.style.marginLeft = '332px';
					$('.fr-list-body').removeClass('rs-fr-list-body');
				}
			};
	};

	const getFriendsList = async () => {
		setShowLoader(true);
		// this.setState({
		// 	showLoader: true,
		// });
		userRequest.getFriendsList().then((res) => {
			if (res && res.status === 200) {
				setFriendList(res.data.data);
				// this.setState({
				// 	friendList: res.data.data,
				// });
			}
			setFriendList(false);

			// this.setState({
			// 	showLoader: false,
			// });
		});

		// this.props.getFriendsList()
	};

	//ON SELECT EVENT HANDLER FUNCTION
	const showUserList = () => {
		history.push('/dashboard/user-management', {
			searchUser: 'Friends',
		});
	};
	// const joinFriendRoom = (otherUser, roomMessages) => {
	// 	joinFriendRoom(otherUser, roomMessages);
	// };
	const checkIsOnline = (userId) => {
		let findId = _.find(
			onlineUserIds,
			(id) => parseInt(id) === parseInt(userId)
		);
		return findId;
	};

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
			<div
				className={
					drawerOpen ? classes.drawerOpenHeader : classes.drawerCloseHeader
				}
			>
				{isMobile ? (
					<IconButton className={classes.searchIconMobile}>
						<SearchIcon />
					</IconButton>
				) : (
					<Input
						id="standard-start-adornment"
						placeholder="Search Contacts..."
						className={classes.searchField}
						onChange={(e) => handleSearch(e)}
						disableUnderline={true}
						startAdornment={
							<InputAdornment position="start">
								<SearchIcon style={{ color: '#4e5165' }} />
							</InputAdornment>
						}
					/>
				)}
				<IconButton
					// onClick={() => handleDrawerClose}
					onClick={() => {
						socket.emit('join-private-room', {
							roomId: 1_2,
							user: 1,
						});
						socket.emit('send-private-message', {
							roomId: '1_2',
							message: 'sbdjfbsjd',
							senderId: 1,
							receiverId: 2,
							messageType: 'text',
						});
						socket.on('new-private-message', function (data) {
							// receiveMessage(data)
							console.log('data*****', data);
						});
					}}
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
			<Grid container justify="flex-end">
				<div
					className={
						selectedTab === 'status' ? classes.dSelectedIcon : classes.dIcon
					}
					onClick={(e) => setSelectedTab('status')}
				></div>
				<div
					className={
						selectedTab === 'chat' ? classes.mSelectedIcon : classes.mIcon
					}
					onClick={(e) => setSelectedTab('chat')}
				></div>
				<div
					className={
						selectedTab === 'plus' ? classes.pSelectedIcon : classes.pIcon
					}
					onClick={(e) => showUserList()}
				></div>
				{/* </div> */}
			</Grid>
			<FriendList
				onlineUserIds={onlineUserIds}
				joinFriendRoom={joinFriendRoom}
				friendList={friendList}
			/>
			{/* <div className={classes.userAvatar}>
				<Avatar
					size={drawerOpen ? 100 : 40}
					textSizeRatio={3}
					round={true}
					name={myProfile.username}
					src={imageViewURL + myProfile.picturePath}
				/>
				{drawerOpen ? (
					<Typography variant="h5" component="h5" className={classes.userName}>
						{myProfile.username || ''}
					</Typography>
				) : null}
				{getLocalStorage('gold') ? (
					<Typography variant="h6" component="h6" className={classes.goldUser}>
						Gold user
					</Typography>
				) : null}
			</div>
			<List
				className={drawerOpen ? classes.sideNavList : classes.sideNavListMobile}
			>
				{sideNav.length &&
					sideNav.map((item) => {
						if (item.value === 'random' && drawerOpen) {
							return (
								<div key={`sideNav_${item.value}`}>
									<Typography variant="h6" style={{ padding: '36px' }}>
										Discover
									</Typography>
									<ListItem
										className={
											drawerOpen ? classes.listItem : classes.listItemMobile
										}
										onClick={() => handleNavClick(item)}
									>
										<img src={`/assets/icons/${item.icon}`} alt={item.label} />
										{drawerOpen ? (
											<ListItemText
												classes={{
													root: classes.sideNavText,
												}}
												primary={item.label}
											/>
										) : null}
									</ListItem>
								</div>
							);
						} else {
							return (
								<ListItem
									key={`sideNav_${item.value}`}
									className={
										drawerOpen ? classes.listItem : classes.listItemMobile
									}
									onClick={() => handleNavClick(item)}
								>
									<img src={`/assets/icons/${item.icon}`} alt={item.label} />
									{drawerOpen ? (
										<ListItemText
											classes={{
												root: classes.sideNavText,
											}}
											primary={item.label}
										/>
									) : null}
								</ListItem>
							);
						}
					})}
			</List> */}
		</Drawer>
		// <div className="f-side-body" id="fr-sidebar">
		// 	<div className="f-side-header pos-re">
		// 		<div
		// 			className={
		// 				leftSidebarState ? 'fr-search-wrapper' : 'rs-fr-search-wrapper'
		// 			}
		// 		>
		// 			<SearchBox />
		// 		</div>
		// 		<div
		// 			className={
		// 				leftSidebarState ? 'so-icon-wrapper mb-3' : 'rs-so-icon-wrapper'
		// 			}
		// 		>
		// 			<div className="s-d-icon c-pointer"></div>
		// 			<div className="s-m-icon c-pointer"></div>
		// 			<span
		// 				className="s-p-icon c-pointer"
		// 				onClick={(e) => showUserList()}
		// 			></span>
		// 		</div>

		// 		<button
		// 			className={
		// 				leftSidebarState
		// 					? 'size-reduce-btn'
		// 					: 'size-reduce-btn rs-size-reduce-btn'
		// 			}
		// 			onClick={handleLeftSidebar}
		// 		>
		// 			{leftSidebarState ? (
		// 				<ArrowBackIosRoundedIcon className="arrow-back-icon" />
		// 			) : (
		// 				<MenuRoundedIcon className="arrow-back-icon" />
		// 			)}
		// 		</button>
		// 	</div>
		// 	{showLoader ? (
		// 		<CircularProgress
		// 			size={40}
		// 			style={{
		// 				color: '#fff',
		// 			}}
		// 			className="sidemenu-loader-center"
		// 		/>
		// 	) : (
		// 		<FriendList
		// 			onlineUserIds={onlineUserIds}
		// 			joinFriendRoom={(otherUser, roomMessages) =>
		// 				joinFriendRoom(otherUser, roomMessages)
		// 			}
		// 			friendList={friendList}
		// 		/>
		// 	)}
		// </div>
	);
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
	loading: state.room.loading,
	token: state.auth.token,
	myFriends: state.friends.myFriendsList,
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			getMyFriendList,
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

// function mapStateToProps(state) {
//   return {};
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     // getFriendsList: (payload) => { return dispatch({ type: actionTypes.FRIENDS_LIST, payload }) },
//   };
// }

// export default withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(Sidebar)
// );
