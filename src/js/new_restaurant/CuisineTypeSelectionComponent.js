import React from 'react'
import CuisineTypeOptionComponent from './CuisineTypeOptionComponent'

export default function CuisineTypeSelectionComponent(props) {
  const cuisineTypes = props.cuisineTypes.map((cuisineType) => {
    return (<CuisineTypeOptionComponent key={cuisineType.get('id')} cuisineType={cuisineType} />)
  })

  const onChange = (e) => {
    const index = e.target.options.selectedIndex
    props.changeHandler(e.target.options[index].value)
  }

  return (
    <select className='cuisine' onChange={onChange}>
      <option>Select a cuisine</option>
      {cuisineTypes}
    </select>
  )
}
