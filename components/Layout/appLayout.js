import React from 'react';
import AppHeader from './appHeader';
import { withRedux } from '../../redux/lib/with-redux-store';

const AppLayout = (props) => {
	return (
		<React.Fragment>
			<AppHeader {...props} />
		</React.Fragment>
	);
};

export default withRedux(AppLayout);
