import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';

import { getCategories } from '../store/actions/category';

import Card from '../components/CategoryCard';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';

export class Categories extends Component {
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
        this.props.getCategories();
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
        const { error, loading, categories } = this.props;

        return (
            <div>
                {
                    loading ? <Loader spinnerType='big' /> : <Fragment>
                        <div className="bg-gray-100 py-8">
                            <div className="container mx-auto flex flex-wrap pt-4 pb-12">
                                {this.state.pageOfItems.map(item =>
                                    <Card key={item.id} category={item} />
                                )}
                            </div>
                        </div>
                        <Pagination pageSize={this.state.pageSize} initialPage={this.state.initPage} items={categories} onChangePage={this.onChangePage} />
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
        categories: state.category.categories
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCategories: () => dispatch(getCategories())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
