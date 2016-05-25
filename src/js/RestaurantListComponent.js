import React from 'react';
import RestaurantListItemComponent from './RestaurantListItemComponent';

export default class RestaurantListComponent extends React.Component {
    componentDidMount() {
        this.props.fetchRestaurants()
    }

    render() {
        let restaurants = this.props.restaurants.map((restaurant) => {
            return (<RestaurantListItemComponent key={restaurant.id} restaurant={restaurant} />)
        });
        return (
            <div>
                <h1>Restaurants</h1>
                {restaurants}
            </div>
        );
    }
}