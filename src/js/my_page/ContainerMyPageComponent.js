import {connect} from 'react-redux'
import * as actions from '../actions/AuthenticationActions'
import * as restaurantActions from '../actions/RestaurantActions'
import MyPageComponent from './MyPageComponent'
import {getUserId} from '../Session'

export const mapStateToProps = (state) => {
  return {
    restaurants: state.restaurants.filter((restaurant) => restaurant.user.id == getUserId())
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

const ContainerMyPageComponent = connect (mapStateToProps, mapDispatchToProps)(MyPageComponent)

export default ContainerMyPageComponent
