import * as actionTypes from './actionTypes';
import axios from 'axios';

export const startCategory = () => {
    return {
        type: actionTypes.GET_CATEGORIES_START,
    }
}

export const successCategory = (categories) => {
    return {
        type: actionTypes.GET_CATEGORIES_SUCCESS,
        categories: [...categories]
    }
}

export const failCategory = (err) => {
    return {
        type: actionTypes.GET_CATEGORIES_FAIL,
        error: err
    }
}

export const getCategories = () => {
    return dispatch => {
        dispatch(startCategory())
        axios.get('http://localhost:8000/api/categories').then(res => {
            dispatch(successCategory(res.data));
        }).catch(err => {
            dispatch(failCategory(err));
        });
    }
}

