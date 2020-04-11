import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

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
