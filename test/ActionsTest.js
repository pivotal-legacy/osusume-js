import expect from 'expect';
import nock from 'nock';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../src/js/Actions';
import * as types from '../src/js/constants/ActionTypes';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe("Actions", () => {
    afterEach(() => {
        nock.cleanAll()
        localStorage.clear();
    });

    it("creates the fetchRestaurants action if the token exists", () => {
        localStorage.setItem('token', 'party');
        let restaurants = [
            {id: 0, name: 'Afuri'},
            {id: 1, name: 'Tsukemen'}
        ];
        nock('http://localhost:8080', {
            headers: {
                'Authorization': 'Bearer party'
                }
            })
            .get('/restaurants')
            .reply(200, restaurants);

        const expectedActions = [
            { type: types.FETCH_RESTAURANTS_REQUEST },
            { type: types.FETCH_RESTAURANTS_SUCCESS, restaurants: restaurants }
        ];
        const store = mockStore( [] );

        return store.dispatch(actions.fetchRestaurants())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            });
        nock.isDone();
    });

    it("creates the fetchSuggestions action", () => {
        localStorage.setItem('token', 'party');
        let suggestions = [
            {name: 'Afuri', address: 'Roppongi'}
        ]
        nock('http://localhost:8080', {
            headers: {
                'Authorization': 'Bearer party'
            },
            method: 'POST',
            body: {restaurantName: 'Afuri'}
        })
          .post('/restaurant_suggestions')
          .reply(200, suggestions)

        const expectedActions = [
            {type: types.FETCH_SUGGESTIONS_SUCCESS, suggestions: suggestions}
        ]
        const store = mockStore([])
        return store.dispatch(actions.fetchSuggestions('AFURI'))
          .then(() => {
              expect(store.getActions()).toEqual(expectedActions)
          })
        nock.isDone();
    })

    it("creates the selectSuggestion action", () => {
        const suggestion = {name: 'Afuri', address: 'Roppongi'};
        const expectedActions = [
            {type: types.SELECT_SUGGESTION, suggestion: suggestion}
        ];
        const store = mockStore([]);
        store.dispatch(actions.selectSuggestion(suggestion));
        expect(store.getActions()).toEqual(expectedActions);
    })
});
