import React from 'react'
import { connect } from 'react-redux'
import DropDownMenu from '../shared_components/DropDownMenu'

export function mapStateToProps(_, ownProps) {
  const options = []

  ownProps.priceRanges.forEach((priceRange) => {
    options.push({
      label: priceRange.range,
      value: priceRange.id.toString()
    })
  })

  return {
    className: 'price-range',
    defaultValue: (ownProps.selectedPriceRange || '').toString(),
    options
  }
}

const PriceRangeSelection = connect(mapStateToProps)(DropDownMenu)

export default PriceRangeSelection
