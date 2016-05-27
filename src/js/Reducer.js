import * as types from './constants/ActionTypes';

module.exports = {
    reducer: function (state = {restaurants: []}, action) {
        switch (action.type) {
            case types.FETCH_RESTAURANTS_SUCCESS:
                return {restaurants: action.restaurants};
            default:
                return state;
        }
    }
}
