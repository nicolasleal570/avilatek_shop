import React, { Component, Fragment } from 'react'

import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'

import { getFavorites } from '../store/actions/favorite'

import Pagination from '../components/Pagination';
import Loader from '../components/Loader';

import { authAxios } from '../http/utils';
import { removeFromFavorite, favoritesListURL } from '../http/urls';
import Axios from 'axios';

class Favorites extends Component {
    constructor() {
        super();

        this.state = {
            pageOfItems: [],
            initPage: 1,
            pageSize: 5,
            loading: false
        };

        this.onChangePage = this.onChangePage.bind(this);
    }

    componentDidMount() {
        this.props.getFavorites(localStorage.getItem("token"));

        let param = new URLSearchParams(this.props.location.search)
        const pageNum = Math.abs(Number(param.get('page')));
        const limitNum = Math.abs(Number(param.get('limit')));

        this.setState({
            ...this.state,
            initPage: pageNum ? pageNum : 1,
            pageSize: limitNum ? limitNum : 5,
        });
    }

    // Method for pagination
    onChangePage(pageOfItems, currentPage, pageSize) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });

        // GET AND SET QUERY PARAMETERS
        let currentUrlParams = new URLSearchParams(this.props.location.search);
        currentUrlParams.set('page', currentPage);
        currentUrlParams.set('limit', pageSize);
        this.props.history.push(this.props.location.pathname + "?" + currentUrlParams.toString());

    }

    deleteElement = slug => {
        this.setState({
            ...this.state,
            loading: true
        });
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
        Axios.post(removeFromFavorite, { slug: slug }, { headers: headers }).then(res => {
            console.log('[NEW ELEM] ', slug);
            this.setState({
                ...this.state,
                loading: false
            });
            this.props.getFavorites(localStorage.getItem('token'));
            alert("Producto eliminado correctamente")
        }).catch(err => console.log(err))
    }

    render() {
        const { loading, error, favProducts } = this.props

        let content = null

        if (error || favProducts.length < 1) {
            content = <div className="w-full md:w-1/4 p-6 flex flex-col flex-grow flex-shrink">
                <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
                    <div className="w-full font-bold text-xl text-gray-800 p-6 uppercase">
                        No tienes elementos favoritos!
                    </div>
                </div>
            </div>
        } else {
            content = <Fragment>
                <div className="w-full mb-4">
                    <h3 className="bg-avilaGreen-200 text-white font-bold rounded-full py-2 px-8 shadow-lg">{favProducts.length} Productos</h3>
                </div>

                {this.state.pageOfItems.map(item =>
                    <div key={item.id} className="w-full md:w-1/4 p-6 flex flex-col flex-grow flex-shrink">
                        <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
                            <Link to="/" className="flex flex-wrap no-underline hover:no-underline">
                                <div className="w-full font-bold text-xl text-gray-800 p-6 uppercase"> {item.name}. </div>
                                <p className="text-gray-800 text-base px-6 mb-5">{item.description}</p>
                            </Link>
                            <div className="px-6 py-2 mb-4">
                                <Link to="/" className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 capitalize"># {item.category.public_name}</Link>
                            </div>
                            <div className="px-6 py-2 text-center">
                                <span className="font-bold"> $ {item.price}</span>
                            </div>
                        </div>
                        <div className="mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow">
                            {this.state.loading ? <Loader spinnerType='big' /> : <div className="flex items-center justify-start px-6">
                                <Link to="/" className="hover:underline bg-gray-500 text-white font-bold rounded-full my-4 py-2 px-8 shadow-lg">Visitar</Link>

                                <button onClick={() => this.deleteElement(item.slug)} className="hover:underline bg-red-600 text-white font-bold rounded-full my-4 py-2 px-6 shadow-lg mx-2">Eliminar</button>
                            </div>}
                        </div>
                    </div>
                )}
            </Fragment>
        }

        return (
            <div>
                {localStorage.getItem('token') === undefined ? <Redirect to="/" /> : null}
                {
                    loading ? <Loader spinnerType='big' /> : <Fragment>
                        <section className="bg-gray-100 py-8">
                            <div className="container mx-auto flex flex-wrap pt-4 pb-12">

                                <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">Tus Productos Favoritos</h1>
                                <div className="w-full mb-4">
                                    <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
                                </div>
                                {content}
                            </div>
                        </section>
                        <Pagination pageSize={this.state.pageSize} initialPage={this.state.initPage} items={favProducts} onChangePage={this.onChangePage} />
                    </Fragment>
                }

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        error: state.favorite.error,
        loading: state.favorite.loading,
        favProducts: state.favorite.favProducts,
        token: state.auth.token,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getFavorites: (token) => dispatch(getFavorites(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
