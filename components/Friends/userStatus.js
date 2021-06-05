import React, { useState, useEffect } from 'react';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import { Grid, Card, Typography } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import Avatar from 'react-avatar';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import FriendList from './friendList';
import $ from 'jquery';
import { connect } from 'react-redux';
import * as userRequest from '../../redux/sagas/Requests/userRequest';
// import history from "../../handler/history.handler";
import config from '../../config';
import * as _ from 'lodash';
import { getLocalStorage, getIsMobile } from '../../utils/localstorage';
import useStyles from '../../styles/userStatus';
import { getMyFriendList } from '../../redux/actions/friends';

let socket = config.socket;

let userId = '';
const UserStatus = ({}) => {
	const classes = useStyles();
	const history = useHistory();
	const isMobile = getIsMobile();

	return (
		<React.Fragment>
			<Grid container>
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<Card
						className={classes.createRoomCard}
						// onClick={() => handleCreateRoomModal()}
					>
						<div className={classes.addCircle}>
							<img
								src="/assets/others/big-plus.svg"
								alt="plus icon"
								height="50px"
							/>
						</div>
					</Card>
				</Grid>
				{[0, 1].map((item) => (
					<Card
						className={classes.createRoomCard}
						// onClick={() => handleCreateRoomModal()}
					>
						{/* <div className={classes.addCircle}> */}
						<img src="/assets/status/1.png" alt="plus icon" />
						{/* </div> */}
					</Card>
				))}
			</Grid>
			<Card
				className={classes.createPost}
				// onClick={() => handleCreateRoomModal()}
			>
				<Typography variant="h5" component="h5" className={classes.username}>
					CREATE POST
				</Typography>
			</Card>
			<Grid container justify="center" style={{ marginTop: '30px' }}>
				<Avatar
					size={50}
					textSizeRatio={3}
					round={true}
					name={'Denny'}
					// src={config.imageViewURL + message.sender.picturePath}
				/>
				<Typography variant="h5" component="h5" className={classes.username}>
					Denny Jones
				</Typography>
				<Card
					className={classes.postCard}
					// onClick={() => handleCreateRoomModal()}
				>
					<Typography variant="h5" component="h5" className={classes.username}>
						Are you a gamer? please check our room by clicking the link below!
						https://www.phiz.com/gamingroom14027428
					</Typography>
					<img src="/assets/status/P6Qiyd.png" alt="plus icon" />
					{/* </div> */}
				</Card>
			</Grid>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	myFriends: state.friends.myFriendsList,
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			getMyFriendList,
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(UserStatus);
