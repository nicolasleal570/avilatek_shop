import React, { useState } from 'react'

import { NavLink, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from "../store/actions/auth";
import Loader from './Loader';
const Navbar = (props) => {
    const [redirect, setRedirect] = useState(false);

    const btnLogout = () => {
        props.logout();
        setRedirect(true)
    }

    const { authenticated } = props;

    let btnForLoginOrLogout = (
        <div>
            {redirect ? <Redirect to='/' /> : null}
            <NavLink to="/login" className="inline-block px-4 py-2 mr-4 hover:underline bg-white text-gray-800 font-bold rounded-full shadow-lg">Iniciar Sesión</NavLink>
            <NavLink to="/signup" className="inline-block px-4 py-2 mr-4 hover:underline font-bold rounded-full shadow-lg border text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white">Registrarse</NavLink>
        </div>
    );

    if (authenticated) {
        btnForLoginOrLogout = (
            <div>
                <p className="inline-block text-white mr-8">Bienvenido, <span className="font-semibold">{props.username}</span> </p>
                <button onClick={() => btnLogout()}
                    className="inline-block px-4 py-2 mr-4 hover:underline bg-white text-gray-800 font-bold rounded-full shadow-lg">Cerrar Sesión</button>
            </div>
        )
    }

    return (
        <nav className="flex items-center justify-between flex-wrap p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <Link to="/" className="font-bold text-2xl lg:text-4xl tracking-tight">AVILA TEK SHOP</Link>
            </div>
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                </button>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="lg:flex-grow">
                    <NavLink to="/" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4">
                        Inicio
                    </NavLink>
                    <NavLink to="/productos" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4">
                        Productos
                    </NavLink>
                    <NavLink to="/categorias" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4">
                        Categorías
                    </NavLink>
                    {
                        authenticated ?
                            <NavLink to="/favoritos" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-400 mr-4"> Favoritos </NavLink>
                            : null
                    }
                </div>
                {btnForLoginOrLogout}
            </div>
        </nav>
    )
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.token !== null,
        username: state.auth.username
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => {
            dispatch(logout())
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
