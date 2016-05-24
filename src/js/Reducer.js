import * as types from './constants/ActionTypes';

module.exports = {
    reducer: function (state = [], action) {
        switch (action.type) {
            case types.FETCH_RESTAURANTS_SUCCESS:
                return action.restaurants;
            default:
                return state;
        }
    }
}