import { connect } from 'react-redux'
import RestaurantDetailComponent from './RestaurantDetailComponent';
import * as restaurantActions from '../actions/RestaurantActions';

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

export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchRestaurant: () => {
            dispatch(restaurantActions.fetchRestaurant(ownProps.params.restaurantId))
        }
    }
};

const ContainerRestaurantDetailComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(RestaurantDetailComponent);

export default ContainerRestaurantDetailComponent;
