import * as actions from './Actions'
import {connect} from 'react-redux'
import RestaurantNewFormComponent from './RestaurantNewFormComponent'

export const mapStateToProps = (state) => {
  return {
    suggestion: state.suggestion,
    priceRanges: state.priceRanges,
    cuisineTypes: state.cuisineTypes
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    fetchPriceRanges: () => {
      dispatch(actions.fetchPriceRanges())
    },
    fetchCuisineTypes: () => {
      dispatch(actions.fetchCuisineTypes())
    },
    addNewRestaurant: (name, address, cuisineId, priceRangeId) => {
      dispatch(actions.addNewRestaurant(name, address, cuisineId, priceRangeId))
    }
  }
}

const ContainerRestaurantNewFormComponent = connect (
  mapStateToProps,
  mapDispatchToProps
)(RestaurantNewFormComponent)

export default ContainerRestaurantNewFormComponent
