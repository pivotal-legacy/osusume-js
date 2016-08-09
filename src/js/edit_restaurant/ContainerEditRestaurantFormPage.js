import * as actions from '../actions/Actions'
import * as restaurantActions from '../actions/RestaurantActions'
import {connect} from 'react-redux'
import EditRestaurantFormPage from './EditRestaurantFormPage'

export const mapStateToProps = (state) => {
  return {
    priceRanges: state.priceRanges,
    cuisineTypes: state.cuisineTypes,
    restaurant: state.currentRestaurant
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchPriceRanges: () => dispatch(actions.fetchPriceRanges()),
    fetchCuisineTypes: () => dispatch(actions.fetchCuisineTypes()),
    fetchRestaurant: () => dispatch(restaurantActions.fetchRestaurant(ownProps.params.restaurant_id))
  }
}

const ContainerEditRestaurantFormPage = connect (
  mapStateToProps,
  mapDispatchToProps
)(EditRestaurantFormPage)

export default ContainerEditRestaurantFormPage
