import React from 'react';
import {pluralize} from '../utils/StringHelpers'

export default class RestaurantDetailComponent extends React.Component {
    componentDidMount() {
        if (this.props.restaurant == undefined) {
            this.props.fetchRestaurants();
        }
    }

    render() {

      let restaurant = this.props.restaurant
      if (restaurant) {
        let photo_urls = restaurant.photo_urls || []
        let images = photo_urls.map((photo_url, index) => {
          return (<img key={index} src={photo_url.url} width={210}  />)
        })

        let date = new Date(restaurant.created_at)
        let author = restaurant.user ? restaurant.user.name : ""
        let formatAuthor =  `${date.toLocaleDateString()} by ${author}`;

        return  (
          <div>
            <div>{images}</div>
            <h1>{restaurant.name}</h1>

            <div className="cuisine">{
                restaurant.cuisine ? restaurant.cuisine.name : ""
            }
            </div>
            <div className="address">{restaurant.address}</div>
            <div className="notes">{restaurant.notes}</div>
            <div className="num-likes">{ pluralize(restaurant.num_likes, 'like') }</div>
            <div className="price-range">{restaurant.price_range}</div>
            <div className="date">{formatAuthor}</div>

          </div>
        )
      } else {
          return null
      }
    }
}
