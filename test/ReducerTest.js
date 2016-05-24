import expect from 'expect'
import {reducer} from '../src/js/Reducer'
import * as types from '../src/js/constants/ActionTypes'
import * as actions from '../src/js/Actions';

describe('Reducer', () => {
    it('returns the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual([])
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

        expect(reducer(undefined, action)).toEqual([
            {id: 0, name: 'Afuri'},
            {id: 1, name: 'Tsukemen'}
        ]);
    });
});