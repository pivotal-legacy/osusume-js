import React from 'react'
import { connect } from 'react-redux'
import DropDownMenu from '../shared_components/DropDownMenu'

export function mapStateToProps(_, ownProps) {
  const options = []

  ownProps.priceRanges.forEach((priceRange) => {
    options.push({
      label: priceRange.get('range'),
      value: priceRange.get('id').toString()
    })
  })

  return {
    className: 'price-range',
    defaultValue: (ownProps.selectedPriceRange || '').toString(),
    options
  }
}

const PriceRangeSelectionComponent = connect(mapStateToProps)(DropDownMenu)

export default PriceRangeSelectionComponent
