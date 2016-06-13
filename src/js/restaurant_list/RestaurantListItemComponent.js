import React from 'react';
import { Link } from 'react-router';

export default function RestaurantListItemComponent(props) {
    let cuisineName = '';
    if (props.restaurant.cuisine) {
        cuisineName = props.restaurant.cuisine.name;
    }
    let photo;
    if ( props.restaurant.photo_urls && props.restaurant.photo_urls.length > 0 ) {
      photo = <img src={props.restaurant.photo_urls[0].url} width={210}  />
    }
    let date = new Date(props.restaurant.updated_at)
    return (
        <div>
            <Link to={`/restaurants/${props.restaurant.id}`}>
              <div className='name'>{props.restaurant.name}</div>
              {photo}
              <div className='cuisine'>{cuisineName}</div>
              <div className='price_range'>{props.restaurant.price_range}</div>
              <div className='updated_at'>{date.toLocaleDateString()}</div>
            </Link>
        </div>
    );
}
