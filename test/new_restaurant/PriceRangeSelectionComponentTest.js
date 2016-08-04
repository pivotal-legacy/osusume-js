import expect from 'expect'
import {fromJS} from 'immutable'
import { mapStateToProps } from '../../src/js/new_restaurant/PriceRangeSelectionComponent'

describe('PriceRangeSelectionComponent', () => {
  describe('mapStateToProps', () => {
    const priceRanges = fromJS([
      { id: 0, range: 'Not Specified' },
      { id: 1, range: '¥0~999' }
    ])

    it('maps ownProps.cuisineTypes to props.options', () => {
      const ownProps = {
        selectedPriceRange: 1,
        priceRanges
      }

      const props = mapStateToProps({}, ownProps)

      expect(props.className).toEqual('price-range')
      expect(props.defaultValue).toEqual('1')
      expect(props.options[0].label).toEqual('Not Specified')
      expect(props.options[0].value).toEqual('0')
      expect(props.options[1].label).toEqual('¥0~999')
      expect(props.options[1].value).toEqual('1')
    })
  })
})
