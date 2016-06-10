import expect from 'expect';
import * as actions from '../../src/js/actions/Actions'
import * as restaurantActions from '../../src/js/actions/RestaurantActions'
import { mapStateToProps, mapDispatchToProps } from '../../src/js/new_restaurant/ContainerRestaurantNewFormComponent'

describe('ContainerRestaurantNewFormComponent', () => {
  afterEach(function () {
    expect.restoreSpies()
  })

  it('mapStateToProps', () => {
    let priceRanges = [
      {id: 0, range: 'Not Specified'},
      {id: 1, range: '¥0~999'}
    ]
    let cuisineTypes = [
      {id: 0, name: 'Not Specified'},
      {id: 1, name: 'Japanese'}
    ]
    let state = {
      priceRanges: priceRanges,
      cuisineTypes: cuisineTypes
    }

    expect(mapStateToProps(state).priceRanges).toEqual(priceRanges)
    expect(mapStateToProps(state).cuisineTypes).toEqual(cuisineTypes)
  })

  it('mapDispatchToProps fetchPriceRanges', () => {
    let dispatch = expect.createSpy()
    mapDispatchToProps(dispatch).fetchPriceRanges()
    expect(dispatch).toHaveBeenCalledWith(actions.fetchPriceRanges())
  })

  it('mapDispatchToProps fetchCuisineTypes', () => {
    let dispatch = expect.createSpy()
    mapDispatchToProps(dispatch).fetchCuisineTypes()
    expect(dispatch).toHaveBeenCalledWith(actions.fetchCuisineTypes())
  })

  it('mapDispatchToProps addNewRestaurant', () => {
    let dispatch = expect.createSpy()
    let fileUploader = expect.createSpy()
    var spy = expect.spyOn(restaurantActions, 'addNewRestaurant')
    let restaurant = {name: 'Afuri', address: 'Roppongi', cuisine_id: 0, price_range_id: 1, notes: 'notes'}
    mapDispatchToProps(dispatch).addNewRestaurant(restaurant, {name: 'ramen.png'}, fileUploader)
    expect(spy).toHaveBeenCalledWith(restaurant, {name: 'ramen.png'}, fileUploader)
    expect(dispatch).toHaveBeenCalledWith(restaurantActions.addNewRestaurant())
  })
})
