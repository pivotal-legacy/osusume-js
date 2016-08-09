import { connect } from 'react-redux'
import RestaurantSearch from './RestaurantSearch'
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

const ContainerRestaurantSearch = connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantSearch)

export default ContainerRestaurantSearch
