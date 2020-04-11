import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { authLogin } from "../store/actions/auth";

class LoginForm extends React.Component {
	state = {
		username: "",
		password: ""
	};

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit = e => {
		e.preventDefault();
		const { username, password } = this.state;
		this.props.login(username, password);
	};

	render() {
		const { error, loading, token } = this.props;
		const { username, password } = this.state;

		if (token) {
			return <Redirect to="/" />;
		}

		return (
			<div className="grid grid-cols-6 gap-4">
				<div className="col-start-2 col-span-4 h-12">

					<div className="w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
						<h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">Inicio de Sesión</h1>
						<div className="w-full mb-8">
							<div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
						</div>

						{error && <p className="text-red-500 text-xs italic">{this.props.error.message}</p>}
						<form onSubmit={this.handleSubmit}>
							<div className="mb-4">
								<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
									Nombre de Usuario
								</label>
								<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									id="username"
									type="text"
									name="username"
									placeholder="Username"
									onChange={this.handleChange}
									value={username}
								/>
							</div>
							<div className="mb-6">
								<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
									Contraseña
								</label>
								<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									id="password"
									type="password"
									name="password"
									placeholder="******************"
									onChange={this.handleChange}
									value={password}
								/>
							</div>
							<div className="mb-6">
								<p className="text-gray-500 text-sm">
									Eres un miembro nuevo? <Link className="text-sm text-rosa-100 hover:text-blue-800" to="/signup">Regístrate</Link>
								</p>
							</div>
							<div className="flex items-center justify-between">
								<button
									className="inline-block px-4 py-2 mr-4 hover:text-gray-800 bg-rosa-100 text-white font-bold rounded-full shadow-lg"
									type="submit">
									Entrar
								</button>
								<Link className="inline-block align-baseline font-bold text-sm text-rosa-100  hover:text-blue-800" to="">
									Forgot Password?
								</Link>
							</div>
						</form>
						<p className="text-center text-white text-xs">
							&copy;2020 Avila Tek Shop. All rights reserved.
						</p>
					</div>
				</div>
			</div>

		);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		token: state.auth.token
	};
};

const mapDispatchToProps = dispatch => {
	return {
		login: (username, password) => dispatch(authLogin(username, password))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginForm);
