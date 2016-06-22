import React from 'react'
import { Link } from 'react-router'
import { pluralize } from '../utils/StringHelpers'

export default function RestaurantListItemComponent(props) {
  let photo
  if ( props.restaurant.photo_urls && props.restaurant.photo_urls.length > 0 ) {
    photo = <img src={props.restaurant.photo_urls[0].url} width={210}  />
  }
  let date = new Date(props.restaurant.updated_at)
  return (
    <div>
      <Link to={`/restaurants/${props.restaurant.id}`}>
        <div className='name'>{props.restaurant.name}</div>
        {photo}
        <div className='cuisine'>{props.restaurant.cuisine.name}</div>
        <div className='price-range'>{props.restaurant.price_range.range}</div>
        <div className='number-likes'>{pluralize(props.restaurant.num_likes, 'like')}</div>
        <div className='updated-at'>{date.toLocaleDateString()}</div>
      </Link>
    </div>
  )
}
