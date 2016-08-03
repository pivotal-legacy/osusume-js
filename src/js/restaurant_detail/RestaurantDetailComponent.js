import React from 'react'
import {pluralize} from '../utils/StringHelpers'
import { Link } from 'react-router'

import CommentComponent from './CommentComponent'
import CommentFormComponent from './CommentFormComponent'

export default class RestaurantDetailComponent extends React.Component {
  componentDidMount() {
    this.props.fetchComments()
    if ( this.props.restaurant == undefined ) {
      this.props.fetchRestaurant()
    }
  }

  render() {
    let restaurant = this.props.restaurant
    if (restaurant) {
      let photo_urls = restaurant.get('photo_urls') ? restaurant.get('photo_urls') : []
      let images = photo_urls.map((photo_url, index) => {
        return (<img key={index} src={photo_url.get('url')} width={210}  />)
      })

      let date = new Date(restaurant.get('updated_at'))
      let author = restaurant.get('user') ? restaurant.get('user').get('name') : ""
      let formatAuthor = `${date.toLocaleDateString()} by ${author}`

      let comments = this.props.comments || []
      let commentsToDisplay = comments.map((comment) => {
        return (<CommentComponent key={comment.get('id')} comment={comment} />)
      })

      let maybeLikeButton = <button onClick={this.props.like}>like</button>
      if ( restaurant.get('liked') ) {
        maybeLikeButton = <button onClick={this.props.removeLike}>remove like</button>
      }

      let deleteButton
      if (this.props.currentUser.get('id') == restaurant.get('user').get('id')) {
        deleteButton = <button className="delete-button" onClick={this.props.deleteRestaurant}>delete</button>
      }

      return  (
        <div>
          <Link to='/'><button className='restaurant-link'>restaurants</button></Link>
          <Link to={`/restaurants/${restaurant.get('id')}/edit`}><button className='edit-details'>Edit Details</button></Link>
          <div>{images}</div>
          <h1>{restaurant.get('name')}</h1>

          <div className="cuisine">{restaurant.get('cuisine').get('name')}</div>
          <div className="address">
            <span>{restaurant.get('address')}</span>
            <Link to={`/restaurants/${restaurant.get('id')}/map/${restaurant.get('place_id')}`}>
              <button className='map-link'>view map</button>
            </Link>
          </div>
          <div className="notes">{restaurant.get('notes')}</div>
          <div className="likes">
            <span className="num-likes">{ pluralize(restaurant.get('num_likes'), 'like') }</span>
            {maybeLikeButton}
          </div>
          <div className="price-range">{restaurant.get('price_range').get('range')}</div>
          <div className="date">{formatAuthor}</div>
          <CommentFormComponent createComment={this.props.createComment} />
          {commentsToDisplay}
          {deleteButton}
        </div>
      )
    } else {
        return null
    }
  }
}
