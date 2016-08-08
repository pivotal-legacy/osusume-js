import React from 'react'
import { Link } from 'react-router'
import { pluralize } from '../utils/StringHelpers'
import placeholder from '../../images/placeholder.jpg'

export default function RestaurantListItemComponent(props) {
  let photoSrc = placeholder
  if ( props.restaurant.photo_urls.length > 0 ) {
    photoSrc = props.restaurant.photo_urls[0].url
  }
  let date = new Date(props.restaurant.updated_at)
  return (
    <Link className='item-with-photo' to={`/restaurants/${props.restaurant.id}`}>
      <img className='photo' src={photoSrc}  />
      <span className='item-info'>
        <div className='name'>{props.restaurant.name}</div>
        <div className='cuisine-and-price-range'>
          {props.restaurant.cuisine.name} | {props.restaurant.price_range.range}
        </div>
        <div>
          <span className='number-likes'>{pluralize(props.restaurant.num_likes, 'like')}</span>
          <span className='pull-right updated-at'>{date.toLocaleDateString()}</span>
        </div>
      </span>
    </Link>
  )
}
