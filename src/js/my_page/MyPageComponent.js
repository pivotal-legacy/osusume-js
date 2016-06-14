import React from 'react'
import { Link } from 'react-router'
import { getUserName } from '../Session'
import RestaurantListItemComponent from '../restaurant_list/RestaurantListItemComponent'

export default class MyPageComponent extends React.Component {
  componentDidMount() {
    if (this.props.restaurants.length == 0) {
      this.props.fetchRestaurants()
    }
  }

  render() {
    let restaurants = this.props.restaurants.map((restaurant) => {
      return (<RestaurantListItemComponent key={restaurant.id} restaurant={restaurant} />)
    })
    return (
      <div>
        <Link to="/"><button>restaurants</button></Link>
        <h1>my page</h1>
        <div>
          <span>{getUserName()}</span>
          <button className='logout' onClick={this.props.logout}>logout</button>
        </div>
        {restaurants}
      </div>
    )
  }
}
