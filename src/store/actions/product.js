import * as actionTypes from './actionTypes';
import axios from 'axios';

export const productStart = () => {
    return {
        type: actionTypes.GET_PRODUCTS_START
    }
}

export const productSuccess = (products) => {
    return {
        type: actionTypes.GET_PRODUCTS_SUCCESS,
        products: [...products]
    }
}

export const productFail = (err) => {
    return {
        type: actionTypes.GET_PRODUCTS_FAIL,
        error: err
    }
}

export const getProducts = () => {
    return dispatch => {
        dispatch(productStart())
        axios.get('http://localhost:8000/api/products/').then(res => dispatch(productSuccess(res.data))).catch(err => dispatch(productFail(err)));
    }
}
