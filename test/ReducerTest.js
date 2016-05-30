import expect from 'expect'
import {reducer} from '../src/js/Reducer'
import * as types from '../src/js/constants/ActionTypes'
import * as actions from '../src/js/Actions';

describe('Reducer', () => {
    it('returns the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual({
            restaurants: [],
            suggestions: []
        })
    });

    it('returns the list of restaurants when the action is FETCH_RESTAURANTS_SUCCESS', () => {
        let restaurants = [
            {id: 0, name: 'Afuri'},
            {id: 1, name: 'Tsukemen'}
        ];
        let action = {
           type: types.FETCH_RESTAURANTS_SUCCESS,
           restaurants: restaurants
        };

        expect(reducer(undefined, action)).toEqual({
            restaurants: [
                {id: 0, name: 'Afuri'},
                {id: 1, name: 'Tsukemen'}
            ],
            suggestions: []
        });
    });

    it('returns the list of suggestions when the actios is FETCH_SUGGESTIONS_SUCCESS', () => {
        let suggestions  = [
            {name: 'Afuri', address: 'Roppongi'},
            {name: 'Singaporean Chicken', address: 'Roppongi'}
        ];
        let action = {
            type: types.FETCH_SUGGESTIONS_SUCCESS,
            suggestions: suggestions
        };

        expect(reducer(undefined, action)).toEqual({
            restaurants: [],
            suggestions: suggestions
        });
    })
});
