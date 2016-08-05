import React from 'react'

export default function SelectedRestaurantComponent(props) {
  return (
    <div className='selected-restaurant'>
      <div>{props.suggestion.name}</div>
      <div>{props.suggestion.address}</div>
      <button onClick={props.editRestaurantClicked}>edit</button>
    </div>
  )
}
