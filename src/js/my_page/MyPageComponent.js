import React from 'react'
import { Link } from 'react-router'
import RestaurantListItemComponent from '../restaurant_list/RestaurantListItemComponent'

export default class MyPageComponent extends React.Component {
  constructor(props) {
    super(props)

    this.myLikesClicked = this.myLikesClicked.bind(this)
    this.state = {showMyLiked: false}
  }

  componentDidMount() {
    if (this.props.myRestaurants.length == 0) {
      this.props.fetchRestaurants()
    }
  }

  myLikesClicked() {
    this.setState({showMyLiked: true})
  }

  render() {
    let restaurants = this.props.myRestaurants
    if (this.state.showMyLiked) {
      restaurants = this.props.myLikedRestaurants
    }
    let restaurantItems = restaurants.map((restaurant) => {
      return (<RestaurantListItemComponent key={restaurant.id} restaurant={restaurant} />)
    })
    return (
      <div>
        <Link to="/"><button>restaurants</button></Link>
        <h1>my page</h1>
        <div>
          <span>{this.props.currentUser.name}</span>
          <button className='logout' onClick={this.props.logout}>logout</button>
        </div>
        <button className='my-likes' onClick={this.myLikesClicked}>my likes</button>
        {restaurantItems}
      </div>
    )
  }
}
