import React from 'react'
import { connect } from 'react-redux'
import DropDownMenu from '../shared_components/DropDownMenu'

export function mapStateToProps(_, ownProps) {
  const options = []

  ownProps.cuisineTypes.forEach((cuisineType) => {
    options.push({
      label: cuisineType.name,
      value: cuisineType.id.toString()
    })
  })

  return {
    className: 'cuisine',
    defaultValue: (ownProps.selectedCuisine || '').toString(),
    options
  }
}

const CuisineTypeSelectionComponent = connect(mapStateToProps)(DropDownMenu)

export default CuisineTypeSelectionComponent
