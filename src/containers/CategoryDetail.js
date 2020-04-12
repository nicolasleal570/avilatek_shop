import React, { Component, Fragment } from 'react'

import Axios from 'axios';
import { categoryDetailURL } from '../http/urls';

import Card from '../components/ProductCard';
import Loader from '../components/Loader'
import Pagination from '../components/Pagination'

class CategoryDetail extends Component {
    constructor() {
        super();

        this.state = {
            products: [],
            loading: true,
            pageOfItems: [],
            initPage: 1,
            pageSize: 5
        };

        this.onChangePage = this.onChangePage.bind(this);
    }

    componentDidMount() {
        let param = new URLSearchParams(this.props.location.search)
        const pageNum = Math.abs(Number(param.get('page')));
        const limitNum = Math.abs(Number(param.get('limit')));

        this.setState({
            ...this.state,
            initPage: pageNum ? pageNum : 1,
            pageSize: limitNum ? limitNum : 5,
        });


        const { match: { params } } = this.props;
        Axios.get(categoryDetailURL(params.slug)).then(res => {
            this.setState({
                ...this.state,
                products: res.data.products,
                loading: false
            });
        }).catch(err => console.log(err));
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

        const { error, loading, products } = this.state;


        return (
            <div>
                {
                    loading ? <Loader spinnerType='big' /> : <Fragment>
                        <div className="bg-gray-100 py-8">
                            <div className="container mx-auto flex flex-wrap pt-4 pb-12">
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

export default CategoryDetail
