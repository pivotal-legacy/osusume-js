import { connect } from 'react-redux'
import RestaurantSearchComponent from './RestaurantSearchComponent'
import * as actions from '../actions/Actions'

export const mapStateToProps = (state) => {
  return {
    suggestions: state.suggestions
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    fetchSuggestions: (name) => {
      dispatch(actions.fetchSuggestions(name))
    }
  }
}

const ContainerRestaurantSearchComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantSearchComponent)

export default ContainerRestaurantSearchComponent
