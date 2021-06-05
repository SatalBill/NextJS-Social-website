import React from 'react';
import RoomHeader from './roomHeader';
import { withRedux } from '../../redux/lib/with-redux-store';

const RoomLayout = (props) => {
	return (
		<React.Fragment>
			<RoomHeader {...props} />
		</React.Fragment>
	);
};

export default withRedux(RoomLayout);
