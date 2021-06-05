import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useParams } from 'react-router-dom';
// import { imageViewURL } from "../../config";
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
import { getRoomDetails, getRoomUsers } from '../redux/actions/room';
import RoomLayout from '../components/Layout/roomLayout';
// import config from "../../config";
// import { getLocalStorage } from "../../utils/localstorage";
import useStyles from '../styles/singleRoom';
// import CreateRoom from "../../components/Room/createRoom";
// import ConfirmationModal from "../../components/Custom/confirmationModal";

// let socket = config.socket;
// let userId = getLocalStorage("userId");

const Room = ({
	getRoomDetails,
	selectedRoom,
	loading,
	getRoomUsers,
	token,
	...rest
}) => {
	Room.getInitialProps = ({ store, isServer, query }) => {
		if (query) {
			console.log('queryParmas************', query);
			//   let {
			// 	restaurantData: { menus, dishes, locations, ...restaurant },
			// 	user,
			// 	...queryParams
			//   } = query;
			//   return {
			// 	queryParams: { ...queryParams },
			// 	restaurant,
			// 	dishesData: dishes,
			// 	user,
			// 	restaurantLocations: locations
			//   };
		}
	};

	const classes = useStyles();
	const { id } = useParams();
	// const [showCreateModal, setShowCreateModal] = useState(false);
	console.log('********props', rest);
	useEffect(() => {
		if (!selectedRoom) {
			getRoomDetails(id, token);
			getRoomUsers(id, token);
		}
	}, [selectedRoom]);

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

	return (
		<RoomLayout>
			{/* {loading?<img src={"/assets/icons/loading.gif"} alt="loading" />:null} */}
		</RoomLayout>
	);
};

const mapStateToProps = (state) => ({
	selectedRoom: state.room.selectedRoom,
	loading: state.room.loading,
	token: state.auth.token,
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			getRoomDetails,
			getRoomUsers,
		},
		dispatch
	);

// Room.getInitialProps = async (ctx) => {
// 	console.log('***************', ctx);
// 	const slug = ctx.query.slug ? ctx.query.slug.toString() : '';
// 	console.log('***************', slug);
// 	// await ctx.store.dispatch(fetchPlace({ slug }));
// 	// return {
// 	//   slug,
// 	// };
// };

Room.getServerSideProps = async (context) => {
	console.log('*********context*********', context);
	const res = await fetch('https://api.github.com/repos/vercel/next.js');
	const json = await res.json();
	return {
		props: { stars: json.stargazers_count },
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Room);
