import React from 'react'
import { Link } from 'react-router'
import { pluralize } from '../utils/StringHelpers'

export default function RestaurantListItemComponent(props) {
  let photo
  if ( props.restaurant.get('photo_urls') && props.restaurant.get('photo_urls').size > 0 ) {
    photo = <img src={props.restaurant.get('photo_urls').first().get('url')} width={210}  />
  }
  let date = new Date(props.restaurant.get('updated_at'))
  return (
    <div>
      <Link to={`/restaurants/${props.restaurant.get('id')}`}>
        <div className='name'>{props.restaurant.get('name')}</div>
        {photo}
        <div className='cuisine'>{props.restaurant.get('cuisine').get('name')}</div>
        <div className='price-range'>{props.restaurant.get('price_range').get('range')}</div>
        <div className='number-likes'>{pluralize(props.restaurant.get('num_likes'), 'like')}</div>
        <div className='updated-at'>{date.toLocaleDateString()}</div>
      </Link>
    </div>
  )
}
