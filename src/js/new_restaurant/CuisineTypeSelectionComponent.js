import React from 'react';
import CuisineTypeOptionComponent from './CuisineTypeOptionComponent'

export default function CuisineTypeSelectionComponent(props) {
  let cuisineTypes = props.cuisineTypes.map((cuisineType) => {
    return (<CuisineTypeOptionComponent cuisineType={cuisineType} />)
  })

  let onChange = (e) => {
    const index = e.target.options.selectedIndex
    props.changeHandler(e.target.options[index].value)
  }

  return (
    <select onChange={onChange}>
      <option>Select a cuisine</option>
      {cuisineTypes}
    </select>
  )
}
