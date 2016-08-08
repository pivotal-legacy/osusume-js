import expect from 'expect'
import { mapStateToProps, mapDispatchToProps } from '../../src/js/edit_restaurant/ContainerEditRestaurantFormComponent'
import * as actions from '../../src/js/actions/Actions'

describe('ContainerEditRestaurantFormComponent', () => {
  afterEach(function () {
    expect.restoreSpies()
  })

  let props = {
    params: {
      restaurant_id: 17
    }
  }

  describe('mapsStateToProps', () => {
    it('finds a restaurant', () => {
      let state = {
        currentRestaurant: {id: 17, name: 'Afuri'}
      }

      expect(mapStateToProps(state, props).restaurant).toEqual({id: 17, name: 'Afuri'})
    })

    it('maps price ranges and cuisine types', () => {
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
        cuisineTypes: cuisineTypes,
        currentRestaurant: {}
      }

      expect(mapStateToProps(state, props).priceRanges).toEqual(priceRanges)
      expect(mapStateToProps(state, props).cuisineTypes).toEqual(cuisineTypes)
    })
  })

  describe('mapDispatchToProps', () => {
    it('fetches PriceRanges', () => {
      let dispatch = expect.createSpy()
      mapDispatchToProps(dispatch).fetchPriceRanges()
      expect(dispatch).toHaveBeenCalledWith(actions.fetchPriceRanges())
    })

    it('fetches CuisineTypes', () => {
      let dispatch = expect.createSpy()
      mapDispatchToProps(dispatch).fetchCuisineTypes()
      expect(dispatch).toHaveBeenCalledWith(actions.fetchCuisineTypes())
    })
  })
})
