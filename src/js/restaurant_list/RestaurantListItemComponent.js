import React from 'react'
import { Link } from 'react-router'
import { pluralize } from '../utils/StringHelpers'
import placeholder from '../../images/placeholder.jpg'

export default function RestaurantListItemComponent(props) {
  let photoSrc = placeholder
  if ( props.restaurant.get('photo_urls') && props.restaurant.get('photo_urls').size > 0 ) {
    photoSrc = props.restaurant.get('photo_urls').first().get('url')
  }
  let date = new Date(props.restaurant.get('updated_at'))
  return (
    <Link className='item-with-photo' to={`/restaurants/${props.restaurant.get('id')}`}>
      <img className='photo' src={photoSrc}  />
      <span className='item-info'>
        <div className='name'>{props.restaurant.get('name')}</div>
        <div className='cuisine-and-price-range'>
          {props.restaurant.get('cuisine').get('name')} | {props.restaurant.get('price_range').get('range')}
        </div>
        <div>
          <span className='number-likes'>{pluralize(props.restaurant.get('num_likes'), 'like')}</span>
          <span className='pull-right updated-at'>{date.toLocaleDateString()}</span>
        </div>
      </span>
    </Link>
  )
}
