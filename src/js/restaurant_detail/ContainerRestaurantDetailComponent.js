import { connect } from 'react-redux'
import RestaurantDetailComponent from './RestaurantDetailComponent'
import * as restaurantActions from '../actions/RestaurantActions'
import * as commentActions from '../actions/CommentActions'

export const mapStateToProps = (state, ownProps) => {
  return {
    restaurant: state.currentRestaurant,
    comments: state.comments,
    currentUser: state.currentUser
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchRestaurant: () => {
      dispatch(restaurantActions.fetchRestaurant(ownProps.params.restaurant_id))
    },
    createComment: (comment) => {
      dispatch(commentActions.createComment(ownProps.params.restaurant_id, comment))
    },
    like: () => {
      dispatch(restaurantActions.like(ownProps.params.restaurant_id))
    },
    removeLike: () => {
      dispatch(restaurantActions.removeLike(ownProps.params.restaurant_id))
    },
    deleteRestaurant: () => {
      dispatch(restaurantActions.deleteRestaurant(ownProps.params.restaurant_id))
    }
  }
}

const ContainerRestaurantDetailComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantDetailComponent)

export default ContainerRestaurantDetailComponent
