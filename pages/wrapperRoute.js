import React, { useEffect, useState } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLocalStorage } from '../utils/localstorage';
import { setToken, setProfile } from '../redux/actions/auth';

const WrapperRoute = (props) => {
	useEffect(() => {
		if (!props.user || !props.token) {
			const token = getLocalStorage('--PhizToken--');
			const profile = getLocalStorage('--PhizUser--');

			if (token) {
				props.setToken(token);
			}
			if (profile) {
				props.setProfile(profile);
			}
		}
	}, [props.user, props.token]);

	return props.token ? (
		<Route {...props} />
	) : (
		<Redirect to={{ pathname: '/login' }} />
	);
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
	token: state.auth.token,
	loading: state.auth.loading,
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ setToken, setProfile }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WrapperRoute);
