import React from 'react'

export default function SelectedRestaurantComponent(props) {
  return (
    <div className='selected-restaurant'>
      <div>{props.suggestion.get('name')}</div>
      <div>{props.suggestion.get('address')}</div>
      <button onClick={props.editRestaurantClicked}>edit</button>
    </div>
  )
}
