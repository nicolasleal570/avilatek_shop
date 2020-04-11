import React, { Component } from "react";
import { connect } from 'react-redux';

import { getCategories } from '../store/actions/category';
import { getProducts } from '../store/actions/product';

import Hero from '../components/Home/Hero';
import Categories from '../components/CategoryCards';
import Products from '../components/ProductCards';
import FooterCallToAction from '../components/FooterCallToAction';

class Home extends Component {
	componentDidMount() {
		this.props.getCategories();
		this.props.getProducts();
	}

	render() {
		const { error, loading, categories, products } = this.props;

		return (
			<div>
				<Hero />

				<Categories limit="3" loading={loading} categories={categories} />
				<Products limit="4" loading={loading} products={products} />
				<FooterCallToAction />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.category.loading,
		error: state.category.error,
		categories: state.category.categories,
		products: state.product.products
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getCategories: () => dispatch(getCategories()),
		getProducts: () => dispatch(getProducts()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
