import React, { Component } from 'react'
import { connect } from 'react-redux';

import { getCategories } from '../store/actions/category';

import Cards from '../components/CategoryCards';

export class Categories extends Component {

    componentDidMount() {
        this.props.getCategories()
    }

    render() {
        const { error, loading, categories } = this.props;

        return (
            <div>
                <Cards loading={loading} categories={categories} />
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
