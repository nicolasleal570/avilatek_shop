import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initiailState = {
    products: [],
    error: null,
    loading: false
}

const startProducts = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    })
}

const successProducts = (state, action) => {
    return updateObject(state, {
        loading: false,
        products: [...action.products],
        error: null
    })
}

const failProducts = (state, action) => {
    return updateObject(state, {
        loading: false,
        products: [],
        error: action.error
    })
}

const reducer = (state = initiailState, action) => {
    switch (action.type) {
        case actionTypes.GET_PRODUCTS_START: return startProducts(state, action);
        case actionTypes.GET_PRODUCTS_SUCCESS: return successProducts(state, action);
        case actionTypes.GET_PRODUCTS_FAIL: return failProducts(state, action);

        default: return state
    }
}

export default reducer;