import React, { Component } from 'react'
import { connect } from 'react-redux';

import { getProducts } from '../store/actions/product';

import ProductCards from '../components/ProductCards';

class Products extends Component {
    componentDidMount() {
        this.props.getProducts();
    }

    render() {
        const { error, loading, products } = this.props;
        return (
            <ProductCards loading={loading} products={products} />
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.category.loading,
        error: state.category.error,
        products: state.product.products
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProducts: () => dispatch(getProducts()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
