import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.secondaryColor,
	},
	tabName: {
		textTransform: 'capitalize',
		marginLeft: '8px',
		color: theme.custom.black86,
	},
	selectedTabName: {
		textTransform: 'capitalize',
		marginLeft: '8px',
	},
	selectUser: {
		position: 'relative',
		width: '226px',
		height: '58px',
		background: theme.custom.black100,
		borderRadius: '19px',
		border: '0px solid',
		paddingRight: '5px',
	},
	searchField: {
		width: '100%',
		padding: '4px 15px',
		border: '1px solid #262839',
		borderRadius: '20px',
		backgroundColor: theme.custom.black100,
		color: theme.custom.black86,
	},
	usersList: {
		overflow: 'auto',
		marginBottom: '15px',
		display: 'flex',
		justifyContent: 'center',
	},
	listItem: {
		paddingLeft: '36px',
		paddingBottom: '11px',
		borderBottom: '1px solid #262839',
		cursor: 'pointer',
	},
	sideNavText: {
		marginLeft: '10px',
	},
	selectedTab: {
		background: theme.secondaryColor,
		border: theme.secondaryColor,
		borderTopLeftRadius: '20px',
		borderTopRightRadius: '20px',
		boxShadow: '1px 0px 4px #1e1d1d',
	},
	unselectedTab: {
		background: theme.custom.black100,
		border: theme.custom.black100,
		borderTopLeftRadius: '20px',
		borderTopRightRadius: '20px',
	},
	messageInput: {
		bottom: '0',
		position: 'fixed',
		backgroundColor: '#4e5165',
		padding: '7px',
		width: '23%',
	},
	input: {
		borderRadius: '12px',
		height: '56px',
		fontSize: '18px',
		paddingLeft: '17px',
		paddingTop: '13px',
	},
}));

export default useStyles;
