import React from 'react'
import CuisineTypeSelection from '../new_restaurant/CuisineTypeSelection'
import PriceRangeSelection from '../new_restaurant/PriceRangeSelection'

export default class EditRestaurantFormPage extends React.Component {
  constructor(props) {
    super(props)

    this.cuisineHandleChanged = this.cuisineHandleChanged.bind(this)
    this.priceRangeHandleChanged = this.priceRangeHandleChanged.bind(this)
    this.noteChanged = this.noteChanged.bind(this)
    this.state = {
      selectedCuisine: props.restaurant.cuisine_id,
      selectedPriceRange: 0,
      notes: '',
    }
  }

  componentDidMount() {
    this.props.fetchCuisineTypes()
    this.props.fetchPriceRanges()
    this.props.fetchRestaurant()
  }

  cuisineHandleChanged(value) {
    this.setState({selectedCuisine: value})
  }

  priceRangeHandleChanged(value) {
    this.setState({selectedPriceRange: value})
  }

  noteChanged(e) {
    this.setState({notes: e.target.value})
  }

  // saveRestaurant() {
  //   this.props.submitRestaurant(
  //     {
  //       cuisine_id: this.state.selectedCuisine,
  //       price_range_id: this.state.selectedPriceRange,
  //       notes: this.state.notes,
  //     }
  //   )
  // }

  render() {
    if (Object.keys(this.props.restaurant).length == 0) {
      return null
    }
    return (
      <div className='stacked-form'>
        <h1>edit a restaurant</h1>
        <h2>{this.props.restaurant.name}</h2>
        <div className='address'>{this.props.restaurant.address}</div>
        <CuisineTypeSelection cuisineTypes={this.props.cuisineTypes}
                              selectedCuisine={this.props.restaurant.cuisine.id}
                              changeHandler={this.cuisineHandleChanged}/>
        <PriceRangeSelection priceRanges={this.props.priceRanges}
                             selectedPriceRange={this.props.restaurant.price_range.id}
                             changeHandler={this.priceRangeHandleChanged}/>
        <label>Notes</label>
        <textarea className="notes" onChange={this.noteChanged} defaultValue={this.props.restaurant.notes} />
      </div>
    )
  }
}
