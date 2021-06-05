import { makeStyles } from '@material-ui/core/styles';
const drawerWidth = 320;

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
		left: '251px',
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
		width: 100,
	},
	drawerOpenHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	drawerCloseHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		justifyContent: 'center',
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
		top: '20px',
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
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),

		marginLeft: drawerWidth,
	},
	//
	sideNavText: {
		marginLeft: '10px',
	},
	sideNavList: {
		padding: '30px 10px 0px 20px',
		height: 'calc(100vh - 250px)',
		overflow: 'auto',
		marginBottom: '38px',
	},
	sideNavListMobile: {
		padding: '30px 10px 0px 20px',
		height: 'calc(100vh - 224px)',
		overflow: 'auto',
		marginBottom: '38px',
	},
	listItem: {
		paddingLeft: '36px',
		paddingBottom: '11px',
		border: '2px solid #2c2f44',
		'&:hover': {
			border: '2px solid #ff8300',
			borderRadius: '10px',
			cursor: 'pointer',
		},
	},
	listItemMobile: {
		marginBottom: '26px',
		border: '2px solid #2c2f44',
		'&:hover': {
			border: '2px solid #ff8300',
			borderRadius: '10px',
			cursor: 'pointer',
		},
	},
	userAvatar: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: '26px',
	},
	userName: {
		textTransform: 'uppercase',
		margin: '10px 0px',
		fontSize: '15px',
	},
	logoutButton: {
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
		width: '76%',
		padding: '4px 15px',
		border: '1px solid #262839',
		borderRadius: '20px',
		backgroundColor: '#262839',
		color: '#4e5165',
		margin: '23px auto 0px',
	},
	headerSec: {
		padding: '40px',
		zIndex: 20,
		background: '#262839',
		position: 'fixed',
		left: '240px',
		right: 0,
		[theme.breakpoints.between('xs', 'sm')]: {
			left: 0,
		},
	},
	headerSecClosed: {
		padding: '40px',
		zIndex: 20,
		background: '#262839',
		position: 'fixed',
		left: '100px',
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
	dIcon: {
		backgroundColor: '#4e5165',
		mask: 'url(/assets/others/s-d-icon.svg) no-repeat center / contain',
		'-webkit-mask':
			'url(/assets/others/s-d-icon.svg) no-repeat center / contain',
		width: '22px',
		height: '27px',
		cursor: 'pointer',
		margin: '16px 20px 0px 0px',
	},
	mIcon: {
		backgroundColor: '#4e5165',
		mask: 'url(/assets/others/s-m-icon.svg) no-repeat center / contain',
		'-webkit-mask':
			'url(/assets/others/s-m-icon.svg) no-repeat center / contain',
		width: '28px',
		height: '28px',
		cursor: 'pointer',
		margin: '16px 20px 0px 0px',
	},
	pIcon: {
		backgroundColor: '#4e5165',
		mask: 'url(/assets/others/s-p-icon.svg) no-repeat center / contain',
		'-webkit-mask':
			'url(/assets/others/s-p-icon.svg) no-repeat center / contain',
		width: '28px',
		height: '28px',
		cursor: 'pointer',
		margin: '16px 20px 0px 0px',
	},
	dSelectedIcon: {
		backgroundColor: theme.palette.primary.main,
		mask: 'url(/assets/others/s-d-icon.svg) no-repeat center / contain',
		'-webkit-mask':
			'url(/assets/others/s-d-icon.svg) no-repeat center / contain',
		width: '22px',
		height: '27px',
		cursor: 'pointer',
		margin: '16px 20px 0px 0px',
	},
	mSelectedIcon: {
		backgroundColor: theme.palette.primary.main,
		mask: 'url(/assets/others/s-m-icon.svg) no-repeat center / contain',
		'-webkit-mask':
			'url(/assets/others/s-m-icon.svg) no-repeat center / contain',
		width: '28px',
		height: '28px',
		cursor: 'pointer',
		margin: '16px 20px 0px 0px',
	},
	pSelectedIcon: {
		backgroundColor: theme.palette.primary.main,
		mask: 'url(/assets/others/s-p-icon.svg) no-repeat center / contain',
		'-webkit-mask':
			'url(/assets/others/s-p-icon.svg) no-repeat center / contain',
		width: '28px',
		height: '28px',
		cursor: 'pointer',
		margin: '16px 20px 0px 0px',
	},
	frindContent: {
		animationName: 'pageLeftDown',
		animationDuration: '1s',
		animationDirection: 'alternate',
		animationFillMode: 'forwards',
	},
	friendcontainer: {
		display: 'flex',
		flexDirection: 'column',
		marginLeft: '48px',
		marginRight: '48px',
		width: '100%',
	},
	chatFooter: {
		position: 'absolute',
		bottom: 0,
		/* left: 0; */
		/* right: 0; */
		width: 'fit-content',
		backgroundColor: '#4e5165',
	},
	messageField: {
		color: '#4e5165',
		margin: '10px 5px',
	},
	headerCard: {
		background: '#2c2f44 0% 0% no-repeat padding-box',
		padding: '11px',
		borderRadius: '11px !important',
	},
}));

export default useStyles;
