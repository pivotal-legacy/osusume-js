import React from 'react'
import RestaurantListItem from './RestaurantListItem'
import { Link } from 'react-router'

export default class RestaurantListPage extends React.Component {
  componentDidMount() {
    this.props.fetchRestaurants()
  }

  render() {
    let restaurants = this.props.restaurants.map((restaurant) => {
      return (<RestaurantListItem key={restaurant.id} restaurant={restaurant} />)
    })

    return (
      <div>
        <Link to="/restaurants/new">
          <button>add restaurant</button>
        </Link>
        <Link to="/my_page">
          <button className='my-page-link'>my page</button>
        </Link>
        <h1>Restaurants</h1>
        {restaurants}
      </div>
    )
  }
}
