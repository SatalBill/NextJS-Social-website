import React, { useEffect, useState } from 'react';
import App from 'next/app';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import nextReduxSaga from 'next-redux-saga';

//Todo - need to remove this layout
import Layout from '../components/Layout';
import Dashboard from './dashboard';
import Room from './room';

// import DashboardPage from "../components/dashboard";
import InstantRoom from '../components/instantRoom/instant_room';
import RandomRoom from '../components/randomRoom/random_room';
import PromoteMyRoom from '../components/promoteRoom';
import { initializeStore } from '../store';
import GlobalPlay from '../components/gameRoom/globalPlay';
// import SingleRoom from '../components/SingleRoom';
import AppTheme from '../components/AppTheme';
import WebSockets from '../components/WebSockets';
import WrapperRoute from './wrapperRoute';
import { withRedux } from '../redux/lib/with-redux-store';
import { getLocalStorage } from '../utils/localstorage';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-stacked-carousel/dist/index.css';
import 'animate.css/animate.css';
import 'sanitize.css';

// import "../styles/globals.css";
import '../styles/App.css';
import '../components/pages/apps/styles.css';
// import "../styles/index.css";
// import "../styles/_index.scss";
// import "../styles/_app.scss";
import '../css/dashboard-common.css';
import '../css/promote.css';
import '../css/play-game.css';
// import "../css/home.css";
import '../css/left-sidebar.css';
import '../css/friend.css';
import '../css/game.css';
import '../css/shop.css';
import '../css/service.css';
import '../css/room.css';
import '../css/addroom.css';
import '../css/instant-video-room.css';

// class MyApp extends App {
// 	componentDidMount() {
// 		// @ts-ignore
// 		// this.props.reduxStore.dispatch(requestAppInitialize());
// 		const token = getLocalStorage('--PhizToken--');
// 		const profile = getLocalStorage('--PhizUser--');
// 		if (token) {
// 			// @ts-ignore
// 			this.props.reduxStore.dispatch(setToken(token));
// 		}
// 		if (profile) {
// 			// @ts-ignore
// 			this.props.reduxStore.dispatch(setProfile(profile));
// 		}
// 	}

// 	render() {
// 		const { Component, pageProps } = this.props;
// 		console.log('***********', this.props);

// 		return (
// 			<AppTheme>
// 				<Provider store={initializeStore({})}>
// 					<Component {...pageProps} />
// 					<ToastContainer />
// 					<WebSockets />
// 				</Provider>
// 			</AppTheme>
// 		);
// 	}
// }

// MyApp.getInitialProps = async ({ Component, ctx }) => {
// 	const appCtx = ctx;
// 	let pageProps = {};
// 	const reduxStore = appCtx.store;
// 	if (Component.getInitialProps) {
// 		pageProps = await Component.getInitialProps(ctx);
// 	}
// 	return { pageProps };
// };

// export default withRedux(nextReduxSaga(MyApp));

const SSR_ROUTES = ['/', '/login', '/register', '/forgot-password'];

export default ({ Component, pageProps }) => {
	const router = useRouter();
	if (router && SSR_ROUTES.includes(router.asPath)) {
		return (
			<Layout>
				<Component {...pageProps} />
				<ToastContainer />
			</Layout>
		);
	} else if (typeof document === 'undefined' || typeof window === 'undefined') {
		return null;
	} else {
		return (
			<AppTheme>
				<Provider store={initializeStore({})}>
					<Router>
						<Switch>
							<WrapperRoute path="/instant-room" component={InstantRoom} />
							<WrapperRoute path="/random_room" component={RandomRoom} />
							<WrapperRoute path="/promoteRoom" component={PromoteMyRoom} />
							<WrapperRoute path="/globalPlay" component={GlobalPlay} />
							<WrapperRoute path="/room/:id" component={Room} />
							<WrapperRoute path="/dashboard" component={Dashboard} />
						</Switch>
						<ToastContainer />
						<WebSockets />
					</Router>
				</Provider>
			</AppTheme>
		);
	}
};
