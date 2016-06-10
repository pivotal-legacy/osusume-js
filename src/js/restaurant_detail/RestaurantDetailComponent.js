import React from 'react';
import {pluralize} from '../utils/StringHelpers'

import CommentComponent from './CommentComponent'

export default class RestaurantDetailComponent extends React.Component {
    componentDidMount() {
      this.props.fetchRestaurant();
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

        let comments = restaurant.comments || []
        let commentsToDisplay = comments.map((comment) => {
          return (<CommentComponent key={comment.id} comment={comment} />)
        })
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
            {commentsToDisplay}
          </div>
        )
      } else {
          return null
      }
    }
}
