import React from 'react'

export default function CuisineTypeOptionComponent(props) {
  return (
    <option key={props.cuisineType.get('id')} value={props.cuisineType.get('id')}>
      {props.cuisineType.get('name')}
    </option>
  )
}
