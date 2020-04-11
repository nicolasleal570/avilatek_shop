import React from "react";
import { withRouter } from "react-router-dom";

import Navbar from '../components/Navbar';

class CustomLayout extends React.Component {
	render() {
		return (
			<div>
				<Navbar />
				{this.props.children}
			</div>
		);
	}
}

export default withRouter(CustomLayout);
