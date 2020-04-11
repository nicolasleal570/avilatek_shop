import React, { Component } from 'react'
import { connect } from 'react-redux';

import { getProducts } from '../store/actions/product';

import Card from '../components/ProductCard';
import Pagination from '../components/Pagination';

class Products extends Component {
    constructor() {
        super();

        this.state = {
            pageOfItems: [],
            initPage: 1
        };

        this.onChangePage = this.onChangePage.bind(this);
    }

    componentDidMount() {
        this.props.getProducts();

        let param = new URLSearchParams(this.props.location.search)
        this.setState({
            ...this.state,
            initPage: param.get('page') ? Number(param.get('page')) : 1
        });

    }

    onChangePage(pageOfItems, currentPage) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });

        console.log('[Current Page - OnChangeMethod]', currentPage);

        // GET AND SET QUERY PARAMETERS
        let currentUrlParams = new URLSearchParams(this.props.location.search);
        currentUrlParams.set('page', currentPage);
        this.props.history.push(this.props.location.pathname + "?" + currentUrlParams.toString());

    }

    render() {

        const { error, loading, products } = this.props;

        return (
            <div>
                <div className="bg-gray-100 py-8">
                    <div className="container mx-auto flex flex-wrap pt-4 pb-12">
                        {this.state.pageOfItems.map(item =>
                            <Card key={item.id} product={item} />
                        )}
                        {!loading ? <Pagination initialPage={this.state.initPage} items={products} onChangePage={this.onChangePage} /> : (<p>Loading</p>)}
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProducts: () => dispatch(getProducts()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
