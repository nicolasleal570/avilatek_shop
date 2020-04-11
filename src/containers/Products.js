import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';

import { getProducts } from '../store/actions/product';

import ProductCards from '../components/ProductCards';
import Card from '../components/ProductCard';
import Pagination from '../components/Pagination';

class Products extends Component {
    constructor() {
        super();

        // an example array of items to be paged
        let exampleItems = [...Array(150).keys()].map(i => ({ id: (i + 1), name: 'Item ' + (i + 1) }));

        this.state = {
            pageOfItems: []
        };
        this.onChangePage = this.onChangePage.bind(this);
    }

    componentDidMount() {
        this.props.getProducts();
    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    render() {
        const { error, loading, products, count, nextPage, prevPage } = this.props;

        return (
            <div>
                <div className="bg-gray-100 py-8">
                    <div className="container mx-auto flex flex-wrap pt-4 pb-12">
                        {this.state.pageOfItems.map(item =>
                            <Card key={item.id} product={item} />
                        )}
                        <Pagination items={this.props.products} onChangePage={this.onChangePage} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.category.loading,
        error: state.category.error,
        products: state.product.products,
        nextPage: state.product.nextPage,
        prevPage: state.product.prevPage,
        count: state.product.count,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProducts: () => dispatch(getProducts()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
