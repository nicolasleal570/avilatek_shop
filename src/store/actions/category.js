import * as actionTypes from './actionTypes';
import { publicAxios } from '../../http/utils';
import { categoryListURL } from '../../http/urls'

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
        publicAxios.get(categoryListURL).then(res => dispatch(successCategory(res.data))).catch(err => dispatch(failCategory(err)));
    }
}

