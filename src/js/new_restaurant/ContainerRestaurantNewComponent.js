import { connect } from 'react-redux'
import RestaurantNewComponent from './RestaurantNewComponent';
import * as actions from '../actions/Actions';

export const mapStateToProps = (state) => {
  return {
    suggestions: state.suggestions
  }
};

export const mapDispatchToProps = (dispatch) => {
  return {
    fetchSuggestions: (name) => {
      dispatch(actions.fetchSuggestions(name))
    }
  }
};

const ContainerRestaurantNewComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantNewComponent);

export default ContainerRestaurantNewComponent;
