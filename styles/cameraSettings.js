import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	backIconButton: {
		borderRadius: '50%',
		height: '40px',
		width: '40px',
		display: 'initial',
		background:
			'transparent linear-gradient(139deg, #ff9200 0%, #ff3100 100%) 0% 0% no-repeat padding-box',
		color: '#fff',
		position: 'absolute',
		top: '33px',
		left: '33px',
		'&:hover': {
			background: '#262839',
			border: '3px solid #ff8300',
		},
	},
	cameraSec: {
		border: '4px double rgb(57 61 86)',
		cursor: 'pointer',
		width: '100%',
		'&:hover': {
			border: '3px solid #ff8300',
		},
	},
	cameraSecSelected: {
		cursor: 'pointer',
		position: 'absolute',
		top: 0,
		left: 0,
	},
	selectedCameraSec: {
		border: '4px double #ff8300',
		cursor: 'pointer',
		width: '100%',
	},
	micSec: {
		cursor: 'pointer',
		height: '85%',
		width: '100%',
		border: '4px double rgb(57 61 86)',
		background:
			'#2C2F44 url(/assets/others/microphon.svg) no-repeat center / contain',
		display: 'table',
		margin: '0 auto',
		position: 'relative',
		'&:hover': {
			border: '3px solid #ff8300',
			color: '#ff8300',
		},
		[theme.breakpoints.between('xs', 'md')]: {
			height: '81%',
		},
	},
	selectedMicSec: {
		cursor: 'pointer',
		height: '85%',
		width: '100%',
		border: '4px double #ff8300',
		background:
			'#2C2F44 url(/assets/others/microphon.svg) no-repeat center / contain',
		display: 'table',
		margin: '0 auto',
		position: 'relative',
		[theme.breakpoints.between('xs', 'md')]: {
			height: '81%',
		},
	},
	cameraHeading: {
		textAlign: 'center',
		marginTop: '10px',
		fontWeight: 400,
		color: theme.palette.primary.main,
		fontSize: '26px',
		marginBottom: '32px',
	},
	cameraText: {
		textAlign: 'center',
		marginTop: '10px',
		fontWeight: 400,
	},
	micSelect: {
		width: '100%',
		background: '#6E7490',
		marginTop: '15px',
	},
	inputFields: {
		color: theme.custom.black86,
		width: '100%',
		padding: '9px 12px',
	},
	microphoneImg: {
		width: '41px',
		background: '#2c2f44',
		mask: 'url(/assets/others/microphon.svg) no-repeat center / contain',
		'-webkit-mask':
			'url(/assets/others/microphon.svg) no-repeat center / contain',
		marginTop: '12px',
		height: '38px',
	},
	actionButtons: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: '10px',
	},
	okButton: {
		background:
			'transparent linear-gradient(139deg, #ff9200 0%, #ff3100 100%) 0% 0% no-repeat padding-box',
		width: '100%',
		borderRadius: '25px',
		color: '#fff',
		fontWeight: 700,
		textTransform: 'uppercase',
	},
	echo: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
}));

export default useStyles;
