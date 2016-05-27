import { connect } from 'react-redux'
import RestaurantListComponent from './RestaurantListComponent';
import * as actions from './Actions';

export const mapStateToProps = (state) => {
    return {
        restaurants: state.restaurants
    }
};

export const mapDispatchToProps = (dispatch) => {
    return {
        fetchRestaurants: () => {
            dispatch(actions.fetchRestaurants())
        }
    }
};

const ContainerRestaurantListComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(RestaurantListComponent);

export default ContainerRestaurantListComponent;
