import React from 'react';
import { Link } from 'react-router';

export default function RestaurantListItemComponent(props) {
    return (
        <div><Link to={`/restaurants/${props.restaurant.id}`}>{props.restaurant.name}</Link></div>
    );
}