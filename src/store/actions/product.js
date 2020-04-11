import * as actionTypes from './actionTypes';
import { publicAxios } from '../../http/utils';
import { productListURL } from '../../http/urls';



export const productStart = () => {
    return {
        type: actionTypes.GET_PRODUCTS_START
    }
}

export const productSuccess = (products) => {
    return {
        type: actionTypes.GET_PRODUCTS_SUCCESS,
        products: [...products.results]
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
        publicAxios.get(productListURL).then(res => dispatch(productSuccess(res.data))).catch(err => dispatch(productFail(err)));
    }
}
