import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    favProducts: [],
    error: null,
    loading: false,
    user: null
}

const favoriteStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const favoriteSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        favProducts: [...action.favProducts],
        user: action.user,
        loading: false
    });
}

const favoriteFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        favProducts: [],
        user: null,
        loading: false
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_FAVORITES_START:
            return favoriteStart(state, action)

        case actionTypes.GET_FAVORITES_SUCCESS:
            return favoriteSuccess(state, action)

        case actionTypes.GET_FAVORITES_FAIL:
            return favoriteFail(state, action)

        default: return state
    }
}

export default reducer;