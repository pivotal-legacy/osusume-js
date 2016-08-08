import React from 'react'
import {pluralize} from '../utils/StringHelpers'
import { Link } from 'react-router'

import CommentComponent from './CommentComponent'
import CommentFormComponent from './CommentFormComponent'

export default class RestaurantDetailComponent extends React.Component {
  componentDidMount() {
    this.props.fetchRestaurant()
  }

  render() {
    let restaurant = this.props.restaurant
    if (Object.keys(restaurant).length == 0) {
      return null
    }
    let photo_urls = restaurant.photo_urls ? restaurant.photo_urls : []
    let images = photo_urls.map((photo_url, index) => {
      return (<img key={index} src={photo_url.url} width={210}  />)
    })

    let date = new Date(restaurant.updated_at)
    let author = restaurant.user ? restaurant.user.name : ""
    let formatAuthor = `${date.toLocaleDateString()} by ${author}`

    let comments = this.props.comments || []
    let commentsToDisplay = comments.map((comment) => {
      return (<CommentComponent key={comment.id} comment={comment} />)
    })

    let maybeLikeButton = <button onClick={this.props.like}>like</button>
    if ( restaurant.liked ) {
      maybeLikeButton = <button onClick={this.props.removeLike}>remove like</button>
    }

    let deleteButton
    if (this.props.currentUser.id == restaurant.user.id) {
      deleteButton = <button className="delete-button" onClick={this.props.deleteRestaurant}>delete</button>
    }

    return  (
      <div>
        <Link to='/'><button className='restaurant-link'>restaurants</button></Link>
        <Link to={`/restaurants/${restaurant.id}/edit`}><button className='edit-details'>Edit Details</button></Link>
        <div>{images}</div>
        <h1>{restaurant.name}</h1>

        <div className="cuisine">{restaurant.cuisine.name}</div>
        <div className="address">
          <span>{restaurant.address}</span>
          <Link to={`/restaurants/${restaurant.id}/map/${restaurant.place_id}`}>
            <button className='map-link'>view map</button>
          </Link>
        </div>
        <div className="notes">{restaurant.notes}</div>
        <div className="likes">
          <span className="num-likes">{ pluralize(restaurant.num_likes, 'like') }</span>
          {maybeLikeButton}
        </div>
        <div className="price-range">{restaurant.price_range.range}</div>
        <div className="date">{formatAuthor}</div>
        <CommentFormComponent createComment={this.props.createComment} />
        {commentsToDisplay}
        {deleteButton}
      </div>
    )
  }
}
