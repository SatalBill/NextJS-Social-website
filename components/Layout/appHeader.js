import React, { useState } from 'react';
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
import clsx from 'clsx';
import Avatar from 'react-avatar';
import { withRouter } from 'next/router';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import { Close } from '@material-ui/icons';
import useStyles from '../../styles/appHeader';
import * as actionTypes from '../../redux/actionTypes';
import { sideNav, imageViewURL } from '../../config';
import {
	clearLocalStorage,
	getLocalStorage,
	getIsMobile,
} from '../../utils/localstorage';

const AppHeader = ({ myProfile, children }) => {
	const [drawerOpen, setDrawerOpen] = useState(true);
	const [selectedNav, setSelectedNav] = useState('Home');
	const [searchText, setSearchText] = useState('');
	const [selectedTab, setSelectedTab] = useState(1);

	const classes = useStyles();
	const history = useHistory();
	const isMobile = getIsMobile();
	console.log('myProfile', myProfile);
	// useEffect(() => {
	// 	if(history && history.location&& history.location.pathname){
	// 		setSelectedNav(item.label);
	// 	}
	// },[history])

	const handleNavClick = (item) => {
		setSelectedNav(item.label);
		history.push(`/dashboard/${item.value}`);
	};

	const handleDrawerClose = () => {
		setDrawerOpen(!drawerOpen);
	};

	const logoutUser = () => {
		clearLocalStorage('user');
		clearLocalStorage('userId');
		clearLocalStorage('userName');
		clearLocalStorage('profile');
		clearLocalStorage('phiz.token');
		history.push('/');
	};

	const handleTabChange = () => {
		setSelectedTab();
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
				<div
					className={
						drawerOpen ? classes.drawerOpenHeader : classes.drawerCloseHeader
					}
				>
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
				<div className={classes.userAvatar}>
					<Avatar
						size={drawerOpen ? 100 : 40}
						textSizeRatio={3}
						round={true}
						name={myProfile && myProfile.username}
						src={imageViewURL + myProfile && myProfile.picturePath}
					/>
					{drawerOpen ? (
						<Typography
							variant="h5"
							component="h5"
							className={classes.userName}
						>
							{(myProfile && myProfile.username) || ''}
						</Typography>
					) : null}
					{getLocalStorage('gold') ? (
						<Typography
							variant="h6"
							component="h6"
							className={classes.goldUser}
						>
							Gold user
						</Typography>
					) : null}
				</div>
				<List
					className={
						drawerOpen ? classes.sideNavList : classes.sideNavListMobile
					}
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
											<img
												src={`/assets/icons/${item.icon}`}
												alt={item.label}
											/>
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
				</List>
				<Button
					startIcon={<SettingsIcon style={{ color: '#fff' }} />}
					className={classes.logoutButton}
					onClick={() => logoutUser()}
				>
					Logout
				</Button>
			</Drawer>
		);
	};

	const renderMobileTabs = () => {
		return (
			<Paper square className={classes.bottomTabs}>
				<Tabs
					// value={value}
					indicatorColor="primary"
					textColor="primary"
					// onChange={handleTabChange}
					aria-label="disabled tabs example"
					elevation={3}
				>
					<Tab
						icon={
							<img
								src={`/assets/icons/icon-home.svg`}
								alt="home"
								className={classes.selectedTab}
							/>
						}
						className={classes.tab}
					/>
					<Tab
						icon={<img src={`/assets/icons/icon-friend.svg`} alt="chat" />}
						className={classes.tab}
					/>
					<Tab
						icon={<img src={`/assets/icons/icon-friend.svg`} alt="user" />}
						className={classes.tab}
					/>
					<Tab
						icon={<img src={`/assets/icons/icon-friend.svg`} alt="user" />}
						className={classes.tab}
					/>
				</Tabs>
			</Paper>
		);
	};

	const handleSearch = (e) => {
		setSearchText(e.target.value);
	};

	return (
		<div className={classes.root}>
			{isMobile ? null : renderWebDrawer()}

			<main
				className={
					isMobile
						? null
						: clsx(classes.content, {
								[classes.contentShift]: drawerOpen,
						  })
				}
			>
				{selectedNav === 'Friends' ? null : (
					<div
						className={drawerOpen ? classes.headerSec : classes.headerSecClosed}
					>
						<Card className={classes.headerCard}>
							<Grid container justify="space-between" alignItems="center">
								<Grid item xs={isMobile ? 6 : 3} container alignItems="center">
									{isMobile ? (
										<IconButton className={classes.menuIconMobile}>
											<MenuRoundedIcon className={classes.menuIcon} />
										</IconButton>
									) : null}
									<Typography
										gutterBottom
										variant="h5"
										component="h5"
										style={{ textAlign: 'left', margin: '0px' }}
									>
										{selectedNav}
									</Typography>
								</Grid>
								<Grid item xs={isMobile ? 2 : 6}>
									{isMobile ? (
										<IconButton className={classes.searchIconMobile}>
											<SearchIcon />
										</IconButton>
									) : (
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
												// endAdornment: (
												// 	<InputAdornment position="end">
												// 		<Close />
												// 	</InputAdornment>
												// ),
											}
										/>
									)}
								</Grid>
								{isMobile ? null : (
									<Grid item xs={3} style={{ textAlign: 'right' }}>
										<img
											src="/assets/others/logout1.svg"
											onClick={(e) => {
												e.preventDefault();
												window.location.href = '/';
											}}
										/>
									</Grid>
								)}
							</Grid>
						</Card>
					</div>
				)}
				<div
					style={{
						padding: selectedNav === 'Friends' ? '0px' : '140px 40px 83px 40px',
					}}
				>
					{children}
				</div>
			</main>
			{isMobile ? renderMobileTabs() : null}
		</div>
	);
};

function mapStateToProps(state) {
	return {
		myProfile: state.auth.user,
		userProfile: state.users.userProfile,
		phizUserProfile: state.users.phizUserProfile,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		showUserProfileAction: (userProfile) => {
			return dispatch({
				type: actionTypes.SHOW_USER_PROFILE_ACTION,
				userProfile,
			});
		},
		getMyProfile: (id) => {
			return dispatch({ type: actionTypes.GET_USER_DETAILS_BY_ID, id });
		},
		getRoomList: () => dispatch(roomAction.getRoomList()),
		showPhizUserProfile: (id) => {
			return dispatch({ type: actionTypes.GET_PHIZ_USER_PROFILE, id });
		},
	};
}

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(AppHeader)
);
