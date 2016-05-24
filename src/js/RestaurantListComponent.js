import React from 'react';
import RestaurantComponent from './RestaurantComponent';

export default class RestaurantListComponent extends React.Component {
    componentDidMount() {
        this.props.fetchRestaurants()
    }

    render() {
        let restaurants = this.props.restaurants.map((restaurant) => {
            return (<RestaurantComponent key={restaurant.id} restaurant={restaurant} />)
        });
        return (
            <div>
                {restaurants}
            </div>
        );
    }
}