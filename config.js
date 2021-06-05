import io from 'socket.io-client';
import { toast } from 'react-toastify';
import { getLocalStorage } from './utils/localstorage';

let local = process.env.NODE_ENV === 'production' ? false : true;
//Todo this need to be removed. token should be used from redux
let token = getLocalStorage('--PhizToken--');
let requestHeaders = {
	headers: {
		Authorization: `Bearer ${token}`,
	},
};
// let serverURL = "https://phizlive.io",
let serverURL = 'https://phiz.tudait.com', //'http://localhost:3328', //'https://phiz.tudait.com', //"https://phizlive.io",
	digitalOceanSpaces = 'https://phiz.live.fra1.digitaloceanspaces.com/',
	bucketName = 'phiz.live';

// if (local) {
//   // serverURL = "http://192.168.43.28:5000"
//   serverURL = "http://localhost:9001";
// }
// let imageViewURL = serverURL + "/phiz/viewFile/";
export const imageViewURL = serverURL + '/phiz/viewFile/';

let socket = io.connect(serverURL);
// socket.on('connect', (payloaded) => {
// 	console.log('Socket is connected');
// });
const toasterMessage = (type, message) => {
	type = type ? type : 'error';
	message = message ? message : 'Something went wrong! please contact admin';
	toast[type](message, {
		position: toast.POSITION.TOP_RIGHT,
	});
};
export const sideNav = [
	{ label: 'Home', value: 'home', icon: 'icon-home.svg', url: '/home' },
	{ label: 'Room', value: 'room', icon: 'icon-room.svg', url: '/room' },
	{
		label: 'Friends',
		value: 'friends',
		icon: 'icon-friend.svg',
		url: '/friends',
	},
	{
		label: 'Manage User',
		value: 'users',
		icon: 'icon-home.svg',
		url: '/user-management',
	},
	{
		label: 'Random',
		value: 'random',
		icon: 'icon-random.svg',
		url: '/random-room',
	},
	{
		label: 'Instant Room',
		value: 'instant-room',
		icon: 'icon-instant.svg',
		url: '/instant-room',
	},
	{ label: 'Apps', value: 'apps', icon: 'icon-app.svg', url: '/apps' },
	{ label: 'Games', value: 'games', icon: 'icon-game.svg', url: '/games' },
	{ label: 'Market', value: 'shop', icon: 'icon-shop.svg', url: '/shop' },
	{
		label: 'Services',
		value: 'service',
		icon: 'icon-service.svg',
		url: '/services',
	},
];
export default {
	requestHeaders,
	// imageViewURL,
	serverURL,
	digitalOceanSpaces,
	bucketName,
	socket,
	toasterMessage,
};
