import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { imageViewURL } from '../../config';
import { Videocam, Visibility, MoreVert } from '@material-ui/icons';
import {
	Card,
	Grid,
	CardMedia,
	Typography,
	CardContent,
	Button,
	Dialog,
	Menu,
	MenuItem,
	IconButton,
} from '@material-ui/core';
import {
	getMyRoomList,
	deleteRoom,
	resetFlags,
} from '../../redux/actions/room';
import config from '../../config';
import { getLocalStorage } from '../../utils/localstorage';
import useStyles from '../../styles/room';
import CreateRoom from '../../components/Room/createRoom';
import ConfirmationModal from '../../components/Custom/confirmationModal';

// let socket = config.socket;
// let userId = getLocalStorage("userId");

const Room = ({
	myRooms,
	getMyRoomList,
	user,
	isRoomDeleted,
	deleteRoom,
	resetFlags,
	isRoomCreated,
	loading,
	token,
}) => {
	const classes = useStyles();
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [selectedRoom, setSelectedRoom] = useState(null);
	const [anchorEl, setAnchorEl] = useState(null);

	useEffect(() => {
		if (myRooms.length === 0) {
			getMyRoomList({ search: '' }, token);
		}
	}, [myRooms]);

	useEffect(() => {
		if (isRoomDeleted || isRoomCreated) {
			resetFlags();
			setShowDeleteModal(false);
			setShowCreateModal(false);
		}
	}, [isRoomDeleted, isRoomCreated]);

	const handleCreateRoomModal = () => {
		setShowCreateModal(true);
		setAnchorEl(null);
	};

	const handleDeleteModal = () => {
		setShowDeleteModal(true);
		setAnchorEl(null);
	};

	const handleClose = () => {
		setSelectedRoom(null);
		setShowCreateModal(false);
		setShowDeleteModal(false);
	};

	const handleRoomDelete = () => {
		deleteRoom({ roomId: selectedRoom.id }, token);
	};

	// const handleCloseMore = () => {
	//   if (anchorRef && anchorRef.current && anchorRef.current.contains(event.target)) {
	//     return;
	//   }
	//   setOpen(false);
	//   setSelectedRoom(null);
	// };

	const handleToggle = (room) => {
		setOpen((prevOpen) => !prevOpen);
		setSelectedRoom(room);
	};

	const handleClick = (event, room) => {
		setAnchorEl(event.currentTarget);
		setSelectedRoom(room);
	};

	const handleCloseMore = () => {
		setAnchorEl(null);
		setSelectedRoom(null);
	};
	return (
		<React.Fragment>
			<Grid
				container
				direction="column"
				justify="space-between"
				alignItems="center"
			>
				<Grid item xs={12}>
					<Typography variant="h2" className={classes.roomHeading}>
						CREATE ROOM FOR DIFFERENT PURPOSES
					</Typography>
				</Grid>
				<Grid item xs={12} style={{ width: '100%' }}>
					<Grid container>
						{myRooms.length && myRooms.length > 0
							? myRooms.map((room) => {
									return (
										<Grid
											item
											xs={12}
											sm={6}
											md={4}
											lg={3}
											key={`my_rooms_${room.id}`}
											style={{ position: 'relative' }}
										>
											<Card className={classes.myRoomCard}>
												<CardMedia
													image={imageViewURL + room.room_image}
													className={classes.myRoomCardMedia}
												></CardMedia>
												{parseInt(room._createdBy.id) === parseInt(user.id) &&
													!loading && (
														<div>
															<IconButton
																aria-controls="simple-menu"
																aria-haspopup="true"
																onClick={(e) => handleClick(e, room)}
																className={classes.moreIcon}
															>
																<MoreVert
																	style={{ color: '#262839', fontSize: '40px' }}
																/>
															</IconButton>
															<Menu
																id="simple-menu"
																anchorEl={anchorEl}
																keepMounted
																open={Boolean(anchorEl)}
																onClose={handleCloseMore}
																// anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
																//   targetOrigin={{horizontal: 'left', vertical: 'top'}}
															>
																<MenuItem
																	className={classes.moreOption}
																	onClick={handleCreateRoomModal}
																>
																	Edit
																</MenuItem>
																<MenuItem
																	className={classes.moreOption}
																	onClick={handleDeleteModal}
																>
																	Delete
																</MenuItem>
																<MenuItem
																	className={classes.moreOption}
																	onClick={handleCloseMore}
																>
																	Promote
																</MenuItem>
															</Menu>
														</div>
													)}
												<Grid
													container
													className={classes.myRoomMediaIcons}
													justify="space-between"
												>
													<Grid item style={{ fontSize: '10px' }}>
														<Videocam className={classes.videoIcons} /> 12
													</Grid>
													<Grid item style={{ fontSize: '10px' }}>
														<Visibility className={classes.videoIcons} /> 9
													</Grid>
												</Grid>
												<div className={classes.mediaOverlayer}></div>
												<CardContent className={classes.myRoomCardContent}>
													<Typography
														variant="body2"
														className={classes.roomName}
													>
														{room.roomName}
													</Typography>
													<Typography
														variant="body2"
														className={classes.roomDesc}
													>
														{room.roomDescription}
													</Typography>
												</CardContent>
												<div className={classes.hoverSection}>
													<Button
														variant="outlined"
														className={classes.visitRoomButton}
														href={`/room/${room.id}`}
													>
														Visit Room
													</Button>
												</div>
											</Card>
										</Grid>
									);
							  })
							: null}
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<Card
								className={classes.createRoomCard}
								onClick={() => handleCreateRoomModal()}
							>
								<div className={classes.addCircle}>
									<img src="/assets/others/big-plus.svg" alt="plus icon" />
								</div>
							</Card>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Typography
						variant="body1"
						component="p"
						style={{ margin: '20px 0px' }}
					>
						As Gold Member you can create up to 10 rooms
					</Typography>
				</Grid>
			</Grid>
			<Dialog
				open={showCreateModal}
				onClose={handleClose}
				classes={{ paper: classes.createModal }}
				style={{ minWidth: '50vw' }}
			>
				<CreateRoom
					handleClose={handleClose}
					type={selectedRoom ? 'edit' : 'add'}
					selectedRoom={selectedRoom}
				/>
			</Dialog>
			<Dialog
				open={showDeleteModal}
				onClose={handleClose}
				classes={{ paper: classes.createModal }}
			>
				<ConfirmationModal
					title="Are you sure you want to delete"
					description={selectedRoom && selectedRoom.roomName}
					okButton="YES"
					okHandler={handleRoomDelete}
					cancelButton="CANCEL"
					cancelHandler={handleClose}
				/>
			</Dialog>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	myRooms: state.room.myRooms,
	isRoomDeleted: state.room.isRoomDeleted,
	isRoomCreated: state.room.isRoomCreated,
	user: state.auth.user,
	loading: state.room.loading,
	token: state.auth.token,
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			getMyRoomList,
			deleteRoom,
			resetFlags,
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(Room);
