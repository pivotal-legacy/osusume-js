import {connect} from 'react-redux'
import * as actions from '../actions/AuthenticationActions'
import * as restaurantActions from '../actions/RestaurantActions'
import MyPage from './MyPage'

export const mapStateToProps = (state) => {
  let restaurants = state.restaurants
  return {
    myRestaurants: restaurants.filter((restaurant) =>
      restaurant.user.id == state.currentUser.id
    ),
    myLikedRestaurants: restaurants.filter((restaurant) =>
      restaurant.liked
    ),
    currentUser: state.currentUser
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(actions.logout())
    },
    fetchRestaurants: () => {
      dispatch(restaurantActions.fetchRestaurants())
    }
  }
}

const ContainerMyPage = connect(mapStateToProps, mapDispatchToProps)(MyPage)

export default ContainerMyPage
