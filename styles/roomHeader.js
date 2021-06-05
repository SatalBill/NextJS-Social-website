import { makeStyles } from '@material-ui/core/styles';
const drawerWidth = 240;
const chatDrawerWidth = 340;

const useStyles = makeStyles((theme) => ({
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		boxShadow: '2px 0px 10px #00000012',
	},
	drawerPaper: {
		width: drawerWidth,
		backgroundColor: theme.palette.secondary.main,
		overflow: 'inherit',
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: 20,
	},
	drawerOpenHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		background:
			'transparent linear-gradient(139deg, #FF9200 0%, #FF3100 100%) 0% 0% no-repeat padding-box',
		minHeight: '100px !important',
	},
	drawerCloseHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		justifyContent: 'center',
		minHeight: '120px',
	},
	drawerOpenHeaderIcon: {
		top: '20px',
		right: '-23px',
		position: 'absolute',
		borderRadius: '50%',
		height: '47px',
		width: '47px',
		boxShadow: '0 0 0 10px #262839',
		background:
			'transparent linear-gradient(139deg, #ff9200 0%, #ff3100 100%) 0% 0% no-repeat padding-box',
		color: '#fff',
		'&:hover': {
			background: '#262839',
			border: '3px solid #ff8300',
		},
	},
	drawerCloseHeaderIcon: {
		top: '70px',
		position: 'absolute',
		borderRadius: '50%',
		height: '47px',
		width: '47px',
		boxShadow: '0 0 0 10px #262839',
		background:
			'transparent linear-gradient(139deg, #ff9200 0%, #ff3100 100%) 0% 0% no-repeat padding-box',
		color: '#fff',
		'&:hover': {
			background: '#262839',
			border: '3px solid #ff8300',
		},
	},
	menuIcon: {
		fontSize: '32px',
		color: '#fff',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		padding: '0px',
		marginLeft: '100px',
	},

	content1: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		padding: '0px',
		marginLeft: '20px',
	},
	content2: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		padding: '0px',
		marginRight: '120px',
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),

		marginLeft: drawerWidth,
	},
	contentShiftMore: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),

		marginRightt: chatDrawerWidth,
	},
	sideNavText: {
		marginLeft: '10px',
	},
	usersList: {
		// height: "calc(100vh - 250px)",
		overflow: 'auto',
		marginBottom: '38px',
		display: 'flex',
		justifyContent: 'center',
	},
	usersListMobile: {
		// padding: "30px 10px 0px 20px",
		// height: "calc(100vh - 224px)",
		// overflow: "auto",
		// marginBottom: "38px",
	},
	avatar: {
		boxShadow: '0px 0px 2px #fff',
		marginRight: '22px',
	},
	followButton: {
		color: '#fff',
		textTransform: 'capitalize',
		borderRadius: '25px',
		minWidth: '115px',
		background:
			'transparent linear-gradient(139deg, #FF9200 0%, #FF3100 100%) 0% 0% no-repeat padding-box',
	},
	avatarList: {
		display: 'flex',
		flexDirection: 'row',
		padding: '0px',
		position: 'relative',
		height: '40px',
		marginBottom: '10px',
	},
	avatarSize: {
		position: 'absolute',
		top: '50%',
		transform: 'translateY(-50%)',
		boxShadow: '0px 0px 2px #fff',
	},
	plusIcon: {
		position: 'absolute',
		top: '50%',
		transform: 'translateY(-50%)',
	},
	listItem: {
		paddingLeft: '36px',
		paddingBottom: '11px',
		borderBottom: '1px solid #262839',
		cursor: 'pointer',
		// "-webkit-transition": "all 1s ease",
		//     "-moz-transition": "all 1s ease",
		//     "-o-transition": "all 1s ease",
		//     "-ms-transition": "all 1s ease",
		//     transition: "all 1s ease",
		'&:hover': {
			'& $giftSection': {
				width: '100px',
				'-webkit-transition': 'all 1s ease',
				'-moz-transition': 'all 1s ease',
				'-o-transition': 'all 1s ease',
				'-ms-transition': 'all 1s ease',
				transition: 'all 1s ease',
			},
		},
	},
	listItemMobile: {
		marginBottom: '26px',
		borderBottom: '1px solid #262839',
		'&:hover': {},
	},
	usersCount: {
		background: '#4E5165',
		padding: '2px 21px',
		borderRadius: '25px',
	},
	giftSection: {
		color: '#fff',
		background:
			'transparent linear-gradient(139deg, #FF9200 0%, #FF3100 100%) 0% 0% no-repeat padding-box',
		width: '0px',
		position: 'absolute',
		right: 0,
		top: 0,
		bottom: 0,
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		overflow: 'hidden',
	},
	userName: {
		textTransform: 'uppercase',
		margin: '10px 0px',
		fontSize: '15px',
	},
	exitButton: {
		width: '100%',
		position: 'absolute',
		bottom: '0px',
		textTransform: 'capitalize',
		color: '#fff',
		background:
			'transparent linear-gradient(139deg, #FF9200 0%, #FF3100 100%) 0% 0% no-repeat padding-box',
	},
	goldUser: {
		fontSize: '10px',
		color: theme.custom.yellowColor,
	},
	headerCard: {
		background: '#2c2f44 0% 0% no-repeat padding-box',
		padding: '11px',
		borderRadius: '11px !important',
	},
	searchField: {
		width: '100%',
		padding: '4px 15px',
		border: '1px solid #262839',
		borderRadius: '20px',
		backgroundColor: '#262839',
		color: '#4e5165',
	},
	headerSec: {
		padding: '10px 10px 10px 33px',
		zIndex: 20,
		background: '#262839',
		position: 'fixed',
		left: '240px',
		right: 0,
		[theme.breakpoints.between('xs', 'sm')]: {
			left: 0,
		},
	},
	headerSecWithChat: {
		padding: '10px 10px 10px 33px',
		zIndex: 20,
		background: '#262839',
		position: 'fixed',
		left: '240px',
		right: '340px',
		[theme.breakpoints.between('xs', 'sm')]: {
			left: 0,
		},
	},
	headerSecClosed: {
		padding: '10px 10px 10px 33px',
		zIndex: 20,
		background: '#262839',
		position: 'fixed',
		left: '145px',
		right: 0,
	},
	bottomTabs: {
		bottom: 0,
		position: 'fixed',
		background: '#2c2f44',
		width: '100%',
	},
	tab: {
		width: '25%',
	},
	selectedTab: {
		border: '2px solid #ff8300',
		borderRadius: '10px',
		cursor: 'pointer',
		padding: '12px',
		margin: '10px',
	},
	menuIconMobile: {
		borderRadius: '50%',
		height: '47px',
		width: '47px',
		boxShadow: '0 0 0 10px #262839',
		background:
			'transparent linear-gradient(139deg, #ff9200 0%, #ff3100 100%) 0% 0% no-repeat padding-box',
		color: '#fff',
		marginRight: '10px',
		'&:hover': {
			background: '#262839',
			border: '3px solid #ff8300',
		},
	},
	searchIconMobile: {
		borderRadius: '50%',
		height: '47px',
		width: '47px',
		background: '#262839',
		color: '#fff',
		textAlign: 'right',
	},
	footerSec: {
		padding: '10px 10px 10px 33px',
		zIndex: 20,
		background: '#262839',
		position: 'fixed',
		left: '240px',
		right: 0,
		bottom: 0,
		[theme.breakpoints.between('xs', 'sm')]: {
			left: 0,
		},
	},
	footerSecWithChat: {
		padding: '10px 10px 10px 33px',
		zIndex: 20,
		background: '#262839',
		position: 'fixed',
		left: '240px',
		right: '340px',
		bottom: 0,
		[theme.breakpoints.between('xs', 'sm')]: {
			left: 0,
		},
	},
	footerSecClosed: {
		padding: '10px 10px 10px 33px',
		zIndex: 20,
		background: '#262839',
		position: 'fixed',
		left: '145px',
		right: 0,
		bottom: 0,
	},
	shareButton: {
		color: '#4e5165',
		fontSize: '16px',
		display: 'flex',
		flexDirection: 'column',
		justifySelf: 'center',
		alignItems: 'center',
		borderRadius: '16px',
		background: '#2c2f44',
		boxShadow: '2px 2px 5px #1f1b1b91',
		padding: '8px',
		marginLeft: '17px',
		width: '100px',
		cursor: 'pointer',
		'&:hover': {
			fontSize: '17px',
			color: '#ff8300',
			'& $shareIcon': {
				backgroundColor: '#ff8300',
			},
		},
	},
	shareIcon: {
		backgroundColor: '#4e5165',
		mask: 'url(/assets/others/shareExcute.svg) no-repeat center / contain',
		'-webkit-mask':
			'url(/assets/others/shareExcute.svg) no-repeat center / contain',
		width: '30px',
		height: '30px',
	},
	joinNowButton: {
		textTransform: 'capitalize',
		color: '#fff',
		padding: '7px 51px',
		float: 'right',
		fontSize: '25px',
		fontWeight: 700,
		background:
			'transparent linear-gradient(139deg, #FF9200 0%, #FF3100 100%) 0% 0% no-repeat padding-box',
	},
	moreIcon: {
		float: 'right',
		color: '#4e5165',
		fontSize: '44px',
	},
	friendListMobile: {
		position: 'fixed',
		top: 0,
		bottom: 0,
	},
	searchMbIcon: {
		color: '#4e5165',
		margin: '72px 0 0px 37px',
		background: '#2c2f44',
		borderRadius: '25px',
		width: '35px',
		height: '35px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	devicesModal: {
		background: theme.custom.black86,
		borderRadius: '31px',
		minWidth: '50vw',
		padding: '30px',
	},
	giftIcon: {
		backgroundColor: '#fff',
		mask: 'url(/assets/others/Gift-04.svg) no-repeat center / contain',
		'-webkit-mask':
			'url(/assets/others/Gift-04.svg) no-repeat center / contain',
		width: '25px',
		height: '25px',
		cursor: 'pointer',
		'&:hover': {
			transform: 'scale(1.05)',
		},
	},
	chatIcon: {
		backgroundColor: '#fff',
		mask: 'url(/assets/others/icon-messge.svg) no-repeat center / contain',
		'-webkit-mask':
			'url(/assets/others/icon-messge.svg) no-repeat center / contain',
		width: '25px',
		height: '25px',
		cursor: 'pointer',
		'&:hover': {
			transform: 'scale(0.96)',
		},
	},
	chatDrawerOpen: {
		width: chatDrawerWidth,
		marginTop: '10px',
		borderTopLeftRadius: '20px',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	chatDrawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: 0,
	},
}));

export default useStyles;
