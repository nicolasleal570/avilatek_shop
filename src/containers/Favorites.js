import React, { Component } from 'react'

import FavoriteCards from '../components/FavoriteCards';
import { connect } from 'react-redux';

import { getFavorites } from '../store/actions/favorite'

class Favorites extends Component {
    componentDidMount() {
        this.props.getFavorites();
    }

    render() {
        const { loading, error, favProducts } = this.props

        return (
            <FavoriteCards loading={loading} products={favProducts} />
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
