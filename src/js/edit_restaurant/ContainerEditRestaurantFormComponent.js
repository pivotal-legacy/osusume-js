import * as actions from '../actions/Actions'
import * as restaurantActions from '../actions/RestaurantActions'
import {connect} from 'react-redux'
import EditRestaurantFormComponent from './EditRestaurantFormComponent'

export const mapStateToProps = (state) => {
  return {
    priceRanges: state.priceRanges,
    cuisineTypes: state.cuisineTypes,
    restaurant: state.currentRestaurant
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
