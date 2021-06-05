import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Config from '../../config';
import {
	Close,
	ChevronLeft,
	ChevronRight,
	Search,
	Videocam,
	Visibility,
} from '@material-ui/icons';
import Slider from 'react-slick';
import {
	Card,
	Link,
	Grid,
	CardMedia,
	Typography,
	CardContent,
	IconButton,
	useTheme,
	useMediaQuery,
	Divider,
	Button,
	CardHeader,
} from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import {
	getAllRoomList,
	getPromotedRoomList,
	getFeaturedRoomList,
} from '../../redux/actions/room';
import config from '../../config';
import { getLocalStorage } from '../../utils/localstorage';
import useStyles from '../../styles/home';

const Home = ({
	allRooms,
	promotedRooms,
	featuredRooms,
	filteredRooms,
	getAllRoomList,
	getPromotedRoomList,
	getFeaturedRoomList,
	token,
}) => {
	const classes = useStyles();
	const [currentSlide, setCurrentSlide] = useState(0);
	const sliderRef = useRef(null);
	const theme = useTheme();
	const matchScreen = useMediaQuery(theme.breakpoints.between('xs', 'md'));

	useEffect(() => {
		if (allRooms.length === 0) {
			getAllRoomList(token);
		}
	}, []);

	useEffect(() => {
		if (promotedRooms.length === 0) {
			getPromotedRoomList(token);
		}
	}, []);

	useEffect(() => {
		if (featuredRooms.length === 0) {
			getFeaturedRoomList(token);
		}
	}, []);

	const next = () => {
		setCurrentSlide(currentSlide + 1);
		sliderRef.current.slickNext();
	};

	const prev = () => {
		setCurrentSlide(currentSlide - 1);
		sliderRef.current.slickPrev();
	};

	const settings = {
		className: 'center',
		centerMode: true,
		infinite: true,
		centerPadding: '0px',
		slidesToShow: matchScreen ? 1 : 3,
		arrows: false,
		autoplay: false,
		autoplaySpeed: 2000,
	};

	return (
		<Grid container justify="space-between">
			<Grid item xs={12} md={8}>
				{filteredRooms && filteredRooms.length > 0 ? (
					filteredRooms.map((room) => {
						return (
							<Card
								key={`filtered_room_${room.id}`}
								className={classes.promotedCards}
							>
								<CardMedia
									image={Config.serverURL + '/phiz/viewFile/' + room.room_image}
									className={classes.roomCardsMedia}
								></CardMedia>
								<Grid
									container
									className={classes.promotedMediaIcons}
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
								<CardContent className={classes.promotedCardContent}>
									<Typography variant="body2" className={classes.roomName}>
										{room.roomName}
									</Typography>
									<Typography variant="body2" className={classes.roomDesc}>
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
						);
					})
				) : (
					<>
						<Typography variant="h2" className={classes.roomHeading}>
							GET NOTICE, PROMOTE YOUR ROOM NOW!
						</Typography>
						<div style={{ position: 'relative' }}>
							<Slider {...settings} ref={sliderRef}>
								{promotedRooms &&
									promotedRooms.map((room) => {
										return (
											<Card
												className={classes.promotedCards}
												key={`promoted_room_${room.id}`}
											>
												<CardMedia
													image={
														Config.serverURL +
														'/phiz/viewFile/' +
														room.room_image
													}
													className={classes.roomCardsMedia}
												></CardMedia>
												<Grid
													container
													className={classes.promotedMediaIcons}
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
												<CardContent className={classes.promotedCardContent}>
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
										);
									})}
							</Slider>
							<IconButton
								className={classes.arrowLeftButton}
								onClick={() => prev()}
							>
								<ChevronLeft className={classes.arrowIcon} />
							</IconButton>
							<IconButton
								className={classes.arrowRightButton}
								onClick={() => next()}
							>
								<ChevronRight className={classes.arrowIcon} />
							</IconButton>
						</div>
					</>
				)}
				<div className={classes.subHeading}>
					<Divider className={classes.leftDivider} />
					<Typography variant="h3">Promoted Rooms</Typography>
					<Divider className={classes.rightDivider} />
				</div>
				<Grid container justify="space-between">
					{promotedRooms.length && promotedRooms.length > 0 ? (
						promotedRooms.map((room, index) => {
							if (index === 9) {
								return (
									<Grid
										key={`promoted_room_${room.id}`}
										item
										xs={12}
										sm={12}
										lg={8}
									>
										<img
											src="/assets/roomImg/PromotoGroup.png"
											alt="PromotoGroup"
											width="100%"
											className={classes.promotionImg}
										/>
									</Grid>
								);
							}
							return (
								<Grid
									key={`promoted_room_${room.id}`}
									item
									xs={12}
									sm={6}
									lg={4}
								>
									<Card className={classes.promotedCards}>
										<CardMedia
											image={
												Config.serverURL + '/phiz/viewFile/' + room.room_image
											}
											className={classes.roomCardsMedia}
										></CardMedia>
										<Grid
											container
											className={classes.promotedMediaIcons}
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
										<CardContent className={classes.promotedCardContent}>
											<Typography variant="body2" className={classes.roomName}>
												{room.roomName}
											</Typography>
											<Typography variant="body2" className={classes.roomDesc}>
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
					) : (
						<Grid item xs={12} lg={8} style={{ marginTop: '20px' }}>
							<img
								src="/assets/roomImg/PromotoGroup.png"
								alt="PromotoGroup"
								width="100%"
								className={classes.promotionImg}
							/>
						</Grid>
					)}
				</Grid>
				<div className={classes.subHeading}>
					<Divider className={classes.leftDivider} />
					<Typography variant="h3">Directories</Typography>
					<Divider className={classes.rightDivider} />
				</div>
				<Grid container justify="space-between">
					{allRooms.length && allRooms.length > 0 ? (
						allRooms.map((room, index) => {
							if (index === 9) {
								return (
									<Grid
										key={`promoted_room_${room.id}`}
										item
										xs={12}
										sm={12}
										lg={8}
									>
										<img
											src="/assets/roomImg/AroundGroup.png"
											alt="AroundGroup"
											width="100%"
											className={classes.promotionImg}
										/>
									</Grid>
								);
							}
							return (
								<Grid
									key={`promoted_room_${room.id}`}
									item
									xs={12}
									sm={6}
									lg={4}
								>
									<Card className={classes.promotedCards}>
										<CardMedia
											image={
												Config.serverURL + '/phiz/viewFile/' + room.room_image
											}
											className={classes.roomCardsMedia}
										></CardMedia>
										<Grid
											container
											className={classes.promotedMediaIcons}
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
										<CardContent className={classes.promotedCardContent}>
											<Typography variant="body2" className={classes.roomName}>
												{room.roomName}
											</Typography>
											<Typography variant="body2" className={classes.roomDesc}>
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
					) : (
						<Grid item xs={12} lg={8} style={{ marginTop: '20px' }}>
							<img
								src="/assets/roomImg/AroundGroup.png"
								alt="AroundGroup"
								width="100%"
								className={classes.promotionImg}
							/>
						</Grid>
					)}
				</Grid>
			</Grid>
			<Grid item xs={12} md={4} lg={3}>
				<Card className={classes.ownCard} style={{ margin: '10px' }}>
					<CardMedia
						image={'/assets/roomImg/big-card.jpg'}
						className={classes.roomCardsMedia}
					>
						<Grid
							container
							className={classes.mediaIcons}
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
					</CardMedia>

					<CardContent style={{ minHeight: '100px' }}>
						<Typography variant="body2">roomName</Typography>
						<Typography variant="body2" className={classes.roomDesc}>
							roomDescription
						</Typography>
					</CardContent>
					<Button className={classes.promoteButton} variant="contained">
						PROMOTE YOUR ROOM
					</Button>
				</Card>
				<Card className={classes.cardsListing}>
					<CardHeader
						className={classes.cardHeader}
						title="Trending Rooms"
						classes={{ title: classes.cardHeaderTitle }}
					/>
					<CardContent>
						{promotedRooms.length && promotedRooms.length > 0
							? promotedRooms.map((room, index) => {
									return (
										<Grid
											container
											key={`trending_rooms_${index}`}
											className={classes.trendingRoomSmCards}
										>
											<img
												src={
													Config.serverURL + '/phiz/viewFile/' + room.room_image
												}
												alt={room.roomName}
												className={classes.trendingRoomImg}
											/>
											<Typography
												variant="body2"
												className={classes.trendingRoomName}
											>
												{room.roomName}
											</Typography>
										</Grid>
									);
							  })
							: null}
					</CardContent>
				</Card>
				<Card className={classes.cardsListing}>
					<CardHeader
						className={classes.cardHeader}
						title="Top 10 Apps on Phiz"
						classes={{ title: classes.cardHeaderTitle }}
					/>
					<CardContent>
						{promotedRooms.length && promotedRooms.length > 0
							? promotedRooms.map((room, index) => {
									return (
										<Grid
											container
											key={`top_appss_${index}`}
											className={classes.trendingRoomSmCards}
										>
											<img
												src={
													Config.serverURL + '/phiz/viewFile/' + room.room_image
												}
												alt={room.roomName}
												className={classes.trendingRoomImg}
											/>
											<Typography
												variant="body2"
												className={classes.trendingRoomName}
											>
												{room.roomName}
											</Typography>
										</Grid>
									);
							  })
							: null}
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
};

const mapStateToProps = (state) => ({
	allRooms: state.room.allRooms,
	promotedRooms: state.room.promotedRooms,
	featuredRooms: state.room.featuredRooms,
	token: state.auth.token,

	filteredRooms: state.room.filteredRooms,
	room: state.room,
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			getAllRoomList,
			getPromotedRoomList,
			getFeaturedRoomList,
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
