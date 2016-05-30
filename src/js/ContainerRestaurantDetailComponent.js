import { connect } from 'react-redux'
import RestaurantDetailComponent from './RestaurantDetailComponent';
import * as actions from './Actions';

const findRestaurant = (state, restaurantId) => {
    return state.restaurants.find((restaurant) => {
        return restaurant.id == restaurantId;
    });
};

export const mapStateToProps = (state, ownProps) => {
    return {
        restaurant: findRestaurant(state, ownProps.params.restaurantId)
    }
};

export const mapDispatchToProps = (dispatch) => {
    return {
        fetchRestaurants: () => {
            dispatch(actions.fetchRestaurants())
        }
    }
};

const ContainerRestaurantDetailComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(RestaurantDetailComponent);

export default ContainerRestaurantDetailComponent;
