import * as actions from '../Actions'
import {connect} from 'react-redux'
import RestaurantNewFormComponent from './RestaurantNewFormComponent'
import S3FileUploader from '../S3FileUploader'
import {hashHistory} from "react-router"
import uuid from 'node-uuid'

export const mapStateToProps = (state) => {
  return {
    priceRanges: state.priceRanges,
    cuisineTypes: state.cuisineTypes,
    fileUploader: new S3FileUploader(uuid),
    hashHistory: hashHistory
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
    addNewRestaurant: (restaurant, file, fileUploader) => {
      dispatch(actions.addNewRestaurant(restaurant, file, fileUploader))
    }
  }
}

const ContainerRestaurantNewFormComponent = connect (
  mapStateToProps,
  mapDispatchToProps
)(RestaurantNewFormComponent)

export default ContainerRestaurantNewFormComponent
