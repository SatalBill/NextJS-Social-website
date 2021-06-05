import Home from '../pages/dashboard/home';
import Room from '../pages/dashboard/room';
import Friends from '../pages/dashboard/friends';
import UserManagement from '../components/pages/userManagement';
import RandomRoom from '../components/pages/random_room';
import RandomRoomSetup from '../components/pages/random_room/random_roomSetup';
import InstantRoom from '../components/pages/instant_room';
import InstantRoomSetup from '../components/pages/instant_room/roomSetup';
import EditProfile from '../components/pages/editProfile/index';
import Apps from '../components/pages/apps';
import Games from '../components/pages/games';
import Shop from '../components/pages/shop';
import Services from '../components/pages/services';

const routes = [
	{ path: '/dashboard/home', name: 'Home', component: Home },
	{ path: '/dashboard/room', name: 'Room', component: Room },
	{
		path: '/dashboard/editProfile',
		name: 'editProfile',
		component: EditProfile,
	},
	{ path: '/dashboard/friends', name: 'Friends', component: Friends },
	{
		path: '/dashboard/user-management',
		name: 'User Management',
		component: UserManagement,
	},
	{ path: '/dashboard/random-room', name: 'RandomRoom', component: RandomRoom },
	{
		path: '/dashboard/randomRoom-setup',
		name: 'RandomRoomSetup',
		component: RandomRoomSetup,
	},
	{
		path: '/dashboard/instant-room',
		name: 'InstantRoom',
		component: InstantRoom,
	},
	{
		path: '/dashboard/room-setup',
		name: 'InstantRoomSetup',
		component: InstantRoomSetup,
	},
	{ path: '/dashboard/apps', name: 'Apps', component: Apps },
	{ path: '/dashboard/games', name: 'Home', component: Games },
	{ path: '/dashboard/shop', name: 'Shop', component: Shop },
	{ path: '/dashboard/services', name: 'Services', component: Services },
];

export default routes;
