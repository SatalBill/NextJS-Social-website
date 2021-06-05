import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from '../utils/dashboardRoutes';
// import SingleRoom from "../../pages/SignleRoom";
import AppLayout from '../components/Layout/appLayout';

const Dashboard = ({ history }) => {
	const [leftStatue, setLeftStatue] = useState(false);

	const handleLinkActive = (txt) => {
		// this.refs.leftSidebar.handleLinkActive(txt);
		// this.leftSidebar.handleLinkActive(txt);
	};

	const constlefStatus = (status) => {
		setLeftStatue(status);
	};

	return (
		<AppLayout>
			<Switch>
				{routes.map((route, idx) => {
					return route.component ? (
						<Route
							key={idx}
							path={route.path}
							exact={route.exact}
							name={route.name}
							render={(props) => (
								<route.component
									{...props}
									handleLinkActive={handleLinkActive}
									s={history}
								/>
							)}
						/>
					) : null;
				})}
			</Switch>
		</AppLayout>
	);
};

export default Dashboard;
