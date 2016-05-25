import React from 'react';

export default class RestaurantDetailComponent extends React.Component {
    componentDidMount() {
        if (this.props.restaurant == undefined) {
            this.props.fetchRestaurants();
        }
    }

    render() {
        return (
            <div>{this.props.restaurant ? this.props.restaurant.name : ""}</div>
        );
    }
}