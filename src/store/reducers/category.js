import * as actionTypes from '../actions/actionTypes';
import { updateObject } from "../utility";

const initialState = {
    categories: [],
    error: null,
    loading: false
}

const categoryStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const categorySuccess = (state, action) => {
    return updateObject(state, {
        categories: [...action.categories],
        error: null,
        loading: false
    });
}

const categoryFail = (state, action) => {
    return updateObject(state, {
        categories: null,
        error: action.error,
        loading: false
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_CATEGORIES_START:
            return categoryStart(state, action);

        case actionTypes.GET_CATEGORIES_SUCCESS:
            return categorySuccess(state, action);

        case actionTypes.GET_CATEGORIES_FAIL:
            return categoryFail(state, action);

        default:
            return state
    }
}

export default reducer;
