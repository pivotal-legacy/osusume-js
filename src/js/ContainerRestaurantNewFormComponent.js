import * as actions from './Actions'
import {connect} from 'react-redux'
import RestaurantNewFormComponent from './RestaurantNewFormComponent'
import S3FileUploader from './S3FileUploader'

export const mapStateToProps = (state) => {
  return {
    priceRanges: state.priceRanges,
    cuisineTypes: state.cuisineTypes,
    fileUploader: new S3FileUploader()
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
    addNewRestaurant: (name, address, cuisineId, priceRangeId, file, fileUploader) => {
      dispatch(actions.addNewRestaurant(name, address, cuisineId, priceRangeId, file, fileUploader))
    }
  }
}

const ContainerRestaurantNewFormComponent = connect (
  mapStateToProps,
  mapDispatchToProps
)(RestaurantNewFormComponent)

export default ContainerRestaurantNewFormComponent
