import React from 'react'

export default function CuisineTypeSelectionComponent(props) {
  const cuisineTypes = props.cuisineTypes.map((cuisineType) => {
    return (
      <option key={cuisineType.get('id')} value={cuisineType.get('id')}>
        {cuisineType.get('name')}
      </option>
    )
  })

  const onChange = (e) => {
    const index = e.target.options.selectedIndex
    props.changeHandler(e.target.options[index].value)
  }

  return (
    <select className='cuisine' onChange={onChange} defaultValue={props.selectedCuisine}>
      <option>Select a cuisine</option>
      {cuisineTypes}
    </select>
  )
}
