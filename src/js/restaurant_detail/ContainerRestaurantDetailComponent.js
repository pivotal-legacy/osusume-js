import { connect } from 'react-redux'
import RestaurantDetailComponent from './RestaurantDetailComponent'
import * as actions from '../actions/Actions'
import * as restaurantActions from '../actions/RestaurantActions'
import * as commentActions from '../actions/CommentActions'

const findRestaurant = (restaurants, restaurantId) => {
  return restaurants.find((restaurant) => {
    return restaurant.get('id') == restaurantId
  })
}

export const mapStateToProps = (state, ownProps) => {
  return {
    restaurant: findRestaurant(state.restaurants, ownProps.params.restaurantId),
    comments: state.comments
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchComments: () => {
      dispatch(commentActions.fetchComments(ownProps.params.restaurantId))
    },
    fetchRestaurant: () => {
      dispatch(restaurantActions.fetchRestaurant(ownProps.params.restaurantId))
    },
    createComment: (comment) => {
      dispatch(commentActions.createComment(ownProps.params.restaurantId, comment))
    },
    like: () => {
      dispatch(restaurantActions.like(ownProps.params.restaurantId))
    },
    removeLike: () => {
      dispatch(restaurantActions.removeLike(ownProps.params.restaurantId))
    }
  }
}

const ContainerRestaurantDetailComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantDetailComponent)

export default ContainerRestaurantDetailComponent
