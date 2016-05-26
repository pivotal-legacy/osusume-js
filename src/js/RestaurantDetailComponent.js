import React from 'react';

export default class RestaurantDetailComponent extends React.Component {
    componentDidMount() {
        if (this.props.restaurant == undefined) {
            this.props.fetchRestaurants();
        }
    }

    formatAuthor() {
        var date = new Date(this.props.restaurant.created_at)
        var author = this.props.restaurant.user ? this.props.restaurant.user.name : ""
        return `${date.toLocaleDateString()} by ${author}`;
    }

    formatLikes() {
        var likes = this.props.restaurant.num_likes
        if (likes ==  1) { return `${likes} like` }
        return `${likes} likes`
    }

    restaurantDetails() {
        if (this.props.restaurant) {
            return  (
              <div>
                <h1>{this.props.restaurant.name}</h1>
                <div className="cuisine">{
                    this.props.restaurant.cuisine ? this.props.restaurant.cuisine.name : ""
                }
                </div>
                <div className="address">{this.props.restaurant.address}</div>
                <div className="notes">{this.props.restaurant.notes}</div>
                <div className="num-likes">{ this.formatLikes() }</div>
                <div className="price-range">{
                  this.props.restaurant.price_range
                }</div>
                <div className="date">{
                    this.formatAuthor()
                }</div>

              </div>
            );
        } else {
            return null
        }
    }

    render() {
        return (
          this.restaurantDetails()
        );
    }
}
