import expect from 'expect';
import nock from 'nock';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../src/js/Actions';
import * as types from '../src/js/constants/ActionTypes';
import S3FileUploader from '../src/js/S3FileUploader';

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
                expect(nock.isDone()).toEqual(true);
                expect(store.getActions()).toEqual(expectedActions)
            });
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
              expect(nock.isDone()).toEqual(true);
              expect(store.getActions()).toEqual(expectedActions)
          })
    })

    it("creates the fetchCuisineTypes action", () => {
        localStorage.setItem('token', 'party');
        let cuisineTypes = [
            {id: 0, name: 'Not Specified'},
            {id: 1, name: 'Japanese'},
            {id: 2, name: 'French'}
        ]
        nock('http://localhost:8080', {
            headers: {'Authorization': 'Bearer party'}
        }).get('/cuisines')
          .reply(200, cuisineTypes)

        const expectedActions = [
            {type: types.FETCH_CUISINE_TYPES_SUCCESS, cuisineTypes: cuisineTypes}
        ]
        const store = mockStore([])
        return store.dispatch(actions.fetchCuisineTypes())
          .then(() => {
              expect(nock.isDone()).toEqual(true);
              expect(store.getActions()).toEqual(expectedActions);
          })
    })

    it("creates the fetchPriceRanges action", () => {
        localStorage.setItem('token', 'party');
        let priceRanges = [
            {id: 0, range: 'Not Specified'},
            {id: 1, range: '¥0~999'},
            {id: 2, range: '¥1000~1999'}
        ]
        nock('http://localhost:8080', {
            headers: {'Authorization': 'Bearer party'}
        }).get('/priceranges')
          .reply(200, priceRanges)

        const expectedActions = [
            {type: types.FETCH_PRICE_RANGES_SUCCESS, priceRanges: priceRanges}
        ]
        const store = mockStore([])
        return store.dispatch(actions.fetchPriceRanges())
          .then(() => {
              expect(nock.isDone()).toEqual(true);
              expect(store.getActions()).toEqual(expectedActions);
          })
    })

    it("saves new restaurant to server", () => {
        localStorage.setItem('token', 'party');
        let restaurant = {
            address:'Roppongi',
            name:'Afuri',
            id:17,
            notes:null,
            cuisine:{
                id:0,
                name:'Not Specified'
            },
            price_range:'Not Specified',
            user:{
                id:16,
                email:'danny',
                name:'Danny'
            },
            comments:[],
            liked:false,
            num_likes:0,
            created_by_user_name:'Danny',
            created_at:'2016-06-01T10:09:05.521Z',
            photo_urls:[{url: 'http://its.a.party!!'}],
            offers_english_menu:false,
            walk_ins_ok:false,
            accepts_credit_cards:false
        }
         nock('http://localhost:8080', {
            headers: {
                'Authorization': 'Bearer party'
            },
            method: 'POST',
            body: {
                name: 'Afuri',
                address: 'Roppongi',
                cuisineId: 0,
                priceRangeId: 1,
                photo_urls: [{url: 'http://its.a.party!!'}]}
        })
          .post('/restaurants')
          .reply(200, restaurant)

        const store = mockStore([])

        let expectedUrl = 'http://its.a.party!!'
        let promise = Promise.resolve(expectedUrl)
        promise.then((expectedUrl) => {
            expect(expectedUrl).toBe(url);
        })

        let s3FileUploader = new S3FileUploader()
        expect.spyOn(s3FileUploader, 'upload').andReturn(promise);

        let file = {name: "myfile.txt"};
        return store.dispatch(actions.addNewRestaurant('AFURI', 'Roppongi', 0, 1, file, s3FileUploader))
          .then(() => {
              expect(s3FileUploader.upload).toHaveBeenCalledWith(file);
              expect(nock.isDone()).toEqual(true);
          })
    })
});
