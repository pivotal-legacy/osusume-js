import { connect } from 'react-redux'
import RestaurantNewComponent from './RestaurantNewComponent';
import * as actions from './Actions';

export const mapStateToProps = (state) => {
  return {
    suggestion: state.suggestion,
    suggestions: state.suggestions
  }
};

export const mapDispatchToProps = (dispatch) => {
  return {
    fetchSuggestions: (name) => {
      dispatch(actions.fetchSuggestions(name))
    },
    selectSuggestion: (suggestion) => {
      dispatch(actions.selectSuggestion(suggestion))
    }
  }
};

const ContainerRestaurantNewComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantNewComponent);

export default ContainerRestaurantNewComponent;
