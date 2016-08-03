import * as actions from '../actions/Actions'
import * as restaurantActions from '../actions/RestaurantActions'
import {connect} from 'react-redux'
import EditRestaurantFormComponent from './EditRestaurantFormComponent'

const findRestaurant = (restaurants, restaurant_id) => {
  return restaurants.find((restaurant) => restaurant.get('id') == restaurant_id)
}

export const mapStateToProps = (state, ownProps) => {
  return {
    priceRanges: state.priceRanges,
    cuisineTypes: state.cuisineTypes,
    restaurant: findRestaurant(state.restaurants, ownProps.params.restaurant_id)
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    fetchPriceRanges: () => dispatch(actions.fetchPriceRanges()),
    fetchCuisineTypes: () => dispatch(actions.fetchCuisineTypes())
    // submitRestaurant: (restaurant, file, fileUploader) =>
    //   dispatch(restaurantActions.updateRestaurant(restaurant, file, fileUploader))
  }
}

const ContainerEditRestaurantFormComponent = connect (
  mapStateToProps,
  mapDispatchToProps
)(EditRestaurantFormComponent)

export default ContainerEditRestaurantFormComponent
