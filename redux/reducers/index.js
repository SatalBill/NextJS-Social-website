import { combineReducers } from 'redux';
import app from './app';
import auth from './auth';
import room from './room';
import friends from './friends';

//old
import users from './users';

const rootReducer = combineReducers({
	app,
	auth,
	users,
	room,
	friends,
});

export default rootReducer;
