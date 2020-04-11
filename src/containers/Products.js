import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';

import { getProducts } from '../store/actions/product';

import Card from '../components/ProductCard';
import Pagination from '../components/Pagination';

import Loader from '../components/Loader';

class Products extends Component {
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
        this.props.getProducts();
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

        console.log('[Current Page - OnChangeMethod]', currentPage);
        console.log('[Page Size - OnChangeMethod]', pageSize);

        // GET AND SET QUERY PARAMETERS
        let currentUrlParams = new URLSearchParams(this.props.location.search);
        currentUrlParams.set('page', currentPage);
        currentUrlParams.set('limit', pageSize);
        this.props.history.push(this.props.location.pathname + "?" + currentUrlParams.toString());

    }

    render() {

        const { error, loading, products } = this.props;
        console.log('[Products]', this.props);

        return (
            <div>
                {
                    loading ? <Loader spinnerType='big' /> :
                        <Fragment>
                            <div className="bg-gray-100 py-8">
                                <div className="container mx-auto flex flex-wrap pt-4 ">
                                    {this.state.pageOfItems.map(item =>
                                        <Card key={item.id} product={item} />
                                    )}
                                </div>
                            </div>
                            <Pagination pageSize={this.state.pageSize} initialPage={this.state.initPage} items={products} onChangePage={this.onChangePage} />
                        </Fragment>
                }
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
