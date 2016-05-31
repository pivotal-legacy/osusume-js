import * as types from './constants/ActionTypes';

module.exports = {
    reducer: function (state, action) {
        if (state == undefined) {
            state = {
                restaurants: [],
                suggestions: [],
                suggestion: undefined
            };
        }
        switch (action.type) {
            case types.FETCH_RESTAURANTS_SUCCESS:
                return Object.assign({}, state,
                    {restaurants: action.restaurants});
            case types.FETCH_SUGGESTIONS_SUCCESS:
                return Object.assign({}, state,
                  {suggestions: action.suggestions});
            case types.SELECT_SUGGESTION:
                return Object.assign({}, state,
                  {suggestion: action.suggestion});
            default:
                return state;
        }
    }
}

