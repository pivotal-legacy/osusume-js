import { connect } from 'react-redux'
import RestaurantDetailComponent from './RestaurantDetailComponent';

const findRestaurant = (restaurants, restaurantId) => {
    return restaurants.find((restaurant) => {
        return restaurant.id == restaurantId;
    });
};

export const mapStateToProps = (state, ownProps) => {
    return {
        restaurant: findRestaurant(state, ownProps.params.restaurantId)
    }
};

const ContainerRestaurantDetailComponent = connect(
    mapStateToProps
)(RestaurantDetailComponent);

export default ContainerRestaurantDetailComponent;