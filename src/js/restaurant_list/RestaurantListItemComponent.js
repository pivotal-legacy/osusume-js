import React from 'react'
import { Link } from 'react-router'
import { pluralize } from '../utils/StringHelpers'

export default function RestaurantListItemComponent(props) {
  let photo
  if ( props.restaurant.get('photo_urls') && props.restaurant.get('photo_urls').size > 0 ) {
    photo = <img className='photo' src={props.restaurant.get('photo_urls').first().get('url')} width={210}  />
  }
  let date = new Date(props.restaurant.get('updated_at'))
  return (
    <Link className='item-with-photo' to={`/restaurants/${props.restaurant.get('id')}`}>
      {photo}
      <span className='item-info'>
        <div className='name'>{props.restaurant.get('name')}</div>
        <div className='cuisine'>{props.restaurant.get('cuisine').get('name')} | {props.restaurant.get('price_range').get('range')}</div>
        <div>
          <span>{pluralize(props.restaurant.get('num_likes'), 'like')}</span>
          <span className='pull-right'>{date.toLocaleDateString()}</span>
        </div>
      </span>
    </Link>
  )
}
