import { connect } from 'react-redux'
import RestaurantListPage from './RestaurantListPage'
import * as actions from '../actions/RestaurantActions'

export const mapStateToProps = (state) => {
  return {
    restaurants: state.restaurants
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    fetchRestaurants: () => {
      dispatch(actions.fetchRestaurants())
    }
  }
}

const ContainerRestaurantListPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantListPage)

export default ContainerRestaurantListPage
