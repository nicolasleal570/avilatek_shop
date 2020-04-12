import * as actionTypes from './actionTypes';
import { favoritesListURL } from '../../http/urls';

import axios from 'axios';

export const startFavorite = () => {
    return {
        type: actionTypes.GET_FAVORITES_START
    }
}

export const successFavorite = (favorites) => {
    return {
        type: actionTypes.GET_FAVORITES_SUCCESS,
        favProducts: favorites.products,
        user: favorites.user,
    }
}

export const failFavorites = err => {
    return {
        type: actionTypes.GET_FAVORITES_FAIL,
        error: err,
    }
}

export const getFavorites = (token) => {
    console.log('[TOKEN] ', token);
    return dispatch => {

        dispatch(startFavorite())

        axios.get(favoritesListURL, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }).then(res => dispatch(successFavorite(res.data))).catch(err => dispatch(failFavorites(err)))

    }
}