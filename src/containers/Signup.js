import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { authSignup } from "../store/actions/auth";

class RegistrationForm extends React.Component {
	state = {
		username: "",
		email: "",
		password1: "",
		password2: ""
	};

	handleSubmit = e => {
		e.preventDefault();
		const { username, email, password1, password2 } = this.state;
		this.props.signup(username, email, password1, password2);
	};

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		const { username, email, password1, password2 } = this.state;
		const { error, loading, token } = this.props;
		if (token) {
			return <Redirect to="/" />;
		}
		return (

			<div className="grid grid-cols-6 gap-4">
				<div className="col-start-2 col-span-4 h-12">

					<div className="w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
						<h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">Regístrate</h1>
						<div className="w-full mb-8">
							<div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
						</div>

						{error && <p className="text-red-500 text-xs italic">{this.props.error.message}</p>}

						<form onSubmit={this.handleSubmit}>
							<div className="flex flex-wrap -mx-3 mb-6">
								<div className="w-full px-3">
									<label
										className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										htmlFor="grid-username">
										Nombre de Usuario
      								</label>
									<input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										id="grid-username"
										type="text"
										name="username"
										value={username}
										onChange={this.handleChange}
										placeholder="Nombre de Usuario (Ej. john99)" />
								</div>
								<div className="w-full px-3">
									<label
										className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										htmlFor="grid-email">
										E-mail
      								</label>
									<input
										className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										id="grid-email"
										type="email"
										name="email"
										value={email}
										onChange={this.handleChange}
										placeholder="Email (Ej. test@email.com)" />
								</div>
							</div>
							<div className="flex flex-wrap -mx-3 mb-6">
								<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
									<label
										className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										htmlFor="grid-password">
										Contraseña
      								</label>
									<input
										className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										id="grid-password"
										type="password"
										name="password1"
										value={password1}
										onChange={this.handleChange}
										placeholder="******************" />
									<p className="text-gray-600 text-xs italic mt-2">Hazla tan larga como sea posible</p>
								</div>
								<div className="w-full md:w-1/2 px-3">
									<label
										className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										htmlFor="grid-confirm-password">
										Confirmar Contraseña
      								</label>
									<input
										className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										id="grid-confirm-password"
										type="password"
										name="password2"
										value={password2}
										onChange={this.handleChange}
										placeholder="******************" />
								</div>
							</div>
							<div className="mb-6">
								<p className="text-gray-500 text-sm">
									Ya tienes una cuenta? <Link className="text-sm text-avilaGreen-200 hover:text-blue-800" to="/login">Inicia Sesión</Link>
								</p>
							</div>
							<button
								className="inline-block px-4 py-2 mr-4 hover:text-gray-800 bg-avilaGreen-200 text-white font-bold rounded-full shadow-lg"
								type="submit">
								Registrarse
							</button>
						</form>
						<p className="text-center text-white text-xs">
							&copy;2020 Avila Tek Shop. All rights reserved.
						</p>
					</div>
				</div>
			</div>

			// <Grid
			//   textAlign="center"
			//   style={{ height: "100vh" }}
			//   verticalAlign="middle"
			// >
			//   <Grid.Column style={{ maxWidth: 450 }}>
			//     <Header as="h2" color="teal" textAlign="center">
			//       Signup to your account
			//     </Header>
			//     {error && <p>{this.props.error.message}</p>}

			//     <React.Fragment>
			//       <Form size="large" onSubmit={this.handleSubmit}>
			//         <Segment stacked>
			//           <Form.Input
			//             onChange={this.handleChange}
			//             value={username}
			//             name="username"
			//             fluid
			//             icon="user"
			//             iconPosition="left"
			//             placeholder="Username"
			//           />
			//           <Form.Input
			//             onChange={this.handleChange}
			//             value={email}
			//             name="email"
			//             fluid
			//             icon="mail"
			//             iconPosition="left"
			//             placeholder="E-mail address"
			//           />
			//           <Form.Input
			//             onChange={this.handleChange}
			//             fluid
			//             value={password1}
			//             name="password1"
			//             icon="lock"
			//             iconPosition="left"
			//             placeholder="Password"
			//             type="password"
			//           />
			//           <Form.Input
			//             onChange={this.handleChange}
			//             fluid
			//             value={password2}
			//             name="password2"
			//             icon="lock"
			//             iconPosition="left"
			//             placeholder="Confirm password"
			//             type="password"
			//           />

			//           <Button
			//             color="teal"
			//             fluid
			//             size="large"
			//             loading={loading}
			//             disabled={loading}
			//           >
			//             Signup
			//           </Button>
			//         </Segment>
			//       </Form>
			//       <Message>
			//         Already have an account? <NavLink to="/login">Login</NavLink>
			//       </Message>
			//     </React.Fragment>
			//   </Grid.Column>
			// </Grid>
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
		signup: (username, email, password1, password2) =>
			dispatch(authSignup(username, email, password1, password2))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RegistrationForm);
