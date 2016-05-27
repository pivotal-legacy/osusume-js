import React from 'react';
import { Link } from 'react-router';

export default function RestaurantListItemComponent(props) {
    let cuisineName = '';
    if (props.restaurant.cuisine) {
        cuisineName = props.restaurant.cuisine.name;
    }
    return (
        <div>
            <Link to={`/restaurants/${props.restaurant.id}`}>{props.restaurant.name}</Link>
            <div className='cuisine'>{cuisineName}</div>
            <div className='price_range'>{props.restaurant.price_range}</div>
            <div className='address'>{props.restaurant.address}</div>
            <div className='number_likes'>{props.restaurant.num_likes}</div>
            <div className='created_by_user_name'>{props.restaurant.created_by_user_name}</div>
            <div className='created_at'>{props.restaurant.created_at}</div>
        </div>
    );
}