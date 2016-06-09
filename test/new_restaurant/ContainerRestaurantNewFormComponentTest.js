import expect from 'expect';
import * as actions from '../../src/js/Actions'
import { mapStateToProps, mapDispatchToProps } from '../../src/js/new_restaurant/ContainerRestaurantNewFormComponent'

describe('ContainerRestaurantNewFormComponent', () => {
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
    var spy = expect.spyOn(actions, 'addNewRestaurant')
    mapDispatchToProps(dispatch).addNewRestaurant('Afuri', 'Roppongi', 0, 1, {name: 'ramen.png'}, fileUploader)
    expect(spy).toHaveBeenCalledWith('Afuri', 'Roppongi', 0, 1, {name: 'ramen.png'}, fileUploader)
    expect(dispatch).toHaveBeenCalledWith(actions.addNewRestaurant())
  })
})
