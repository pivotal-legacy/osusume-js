import expect from 'expect'
import { mapStateToProps } from '../../src/js/new_restaurant/CuisineTypeSelectionComponent'

describe('CuisineTypeSelectionComponent', () => {
  describe('mapStateToProps', () => {
    const cuisineTypes = [
      {id: 0, name: 'Not Specified'},
      {id: 1, name: 'Japanese'}
    ]

    it('maps ownProps.cuisineTypes to props.options', () => {
      const ownProps = {
        cuisineTypes: cuisineTypes,
        selectedCuisine: 1
      }

      const props = mapStateToProps({}, ownProps)

      expect(props.className).toEqual('cuisine')
      expect(props.defaultValue).toEqual('1')
      expect(props.options[0].label).toEqual('Not Specified')
      expect(props.options[0].value).toEqual('0')
      expect(props.options[1].label).toEqual('Japanese')
      expect(props.options[1].value).toEqual('1')
    })
  })
})
