import expect from 'expect'
import reducer from '../src/js/Reducer'
import * as types from '../src/js/constants/ActionTypes'

describe('Reducer', () => {
    it('returns the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual({
            restaurants: [],
            suggestions: [],
            cuisineTypes: [],
            priceRanges: []
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
            suggestions: [],
            cuisineTypes: [],
            priceRanges: []
        });
    });

    it('returns the list of suggestions when the action is FETCH_SUGGESTIONS_SUCCESS', () => {
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
            suggestions: suggestions,
            cuisineTypes: [],
            priceRanges: []
        });
    })

    it('returns the cuisine types the action is FETCH_CUISINE_TYPES_SUCCESS', () => {
        let cuisineTypes = [
            {id: 0, name: 'Not Specified'},
            {id: 1, name: 'Japanese'},
            {id: 2, name: 'French'}
        ];
        let action = {
            type: types.FETCH_CUISINE_TYPES_SUCCESS,
            cuisineTypes: cuisineTypes
        };

        expect(reducer(undefined, action)).toEqual({
            restaurants: [],
            suggestions: [],
            cuisineTypes: cuisineTypes,
            priceRanges: []
        });
    })

    it('returns the price ranges the action is FETCH_PRICE_RANGES_SUCCESS', () => {
        let priceRanges = [
            {id: 0, range: 'Not Specified'},
            {id: 1, range: '¥0~999'},
            {id: 2, range: '¥1000~1999'}
        ];
        let action = {
            type: types.FETCH_PRICE_RANGES_SUCCESS,
            priceRanges: priceRanges
        };

        expect(reducer(undefined, action)).toEqual({
            restaurants: [],
            suggestions: [],
            cuisineTypes: [],
            priceRanges: priceRanges
        });
    })

    it('returns state the action is ADD_RESTAURANT_SUCCESS', () => {
        let action = {
            type: types.ADD_RESTAURANT_SUCCESS
        };

        expect(reducer(undefined, action)).toEqual({
            restaurants: [],
            suggestions: [],
            cuisineTypes: [],
            priceRanges: []
        });
    })

});
