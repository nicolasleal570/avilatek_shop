import React, { Component, Fragment } from 'react'

import { connect } from 'react-redux';

import { getFavorites } from '../store/actions/favorite'

import Pagination from '../components/Pagination';
import Card from '../components/ProductCard';
import Loader from '../components/Loader';

class Favorites extends Component {
    constructor() {
        super();

        this.state = {
            pageOfItems: [],
            initPage: 1,
            pageSize: 5
        };

        this.onChangePage = this.onChangePage.bind(this);
    }

    componentDidMount() {
        this.props.getFavorites();

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

    render() {
        const { loading, error, favProducts } = this.props

        let content = null

        if (error && favProducts.length < 1) {
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
                    <Card key={item.id} product={item} />
                )}
            </Fragment>
        }

        return (
            <div>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getFavorites: () => dispatch(getFavorites())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
