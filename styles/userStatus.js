import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	createRoomCard: {
		backgroundColor: theme.palette.secondary.main,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		boxShadow: '0px 3px 6px #00000029',
		minHeight: '200px',
		borderRadius: '31px',
		margin: '10px',
		cursor: 'pointer',
		'&:hover': {
			border: '5px solid #ff8300',
			'& $addCircle': {
				backgroundColor: theme.palette.primary.main,
				transform: 'scale(1.02)',
			},
		},
	},
	addCircle: {
		width: '70px',
		height: '70px',
		borderRadius: '50%',
		backgroundColor: '#393E5D',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		boxShadow: '0px 3px 6px #00000029',
	},
	createPost: {
		backgroundColor: theme.palette.secondary.main,
		height: '60px',
		alignItems: 'center',
		display: 'flex',
		paddingLeft: '10px',
		borderRadius: '15px',
	},
	username: {
		textTransform: 'uppercase',
		margin: '10px 0px',
		fontSize: '15px',
		paddingLeft: '15px',
	},
}));

export default useStyles;
