import React from 'react'
import CuisineTypeSelectionComponent from '../new_restaurant/CuisineTypeSelectionComponent'
import PriceRangeSelectionComponent from '../new_restaurant/PriceRangeSelectionComponent'

export default class EditRestaurantFormComponent extends React.Component {
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
    return (
      <div className='stacked-form'>
        <h1>edit a restaurant</h1>
        <h2>{this.props.restaurant.get('name')}</h2>
        <div className='address'>{this.props.restaurant.get('address')}</div>
        <CuisineTypeSelectionComponent cuisineTypes={this.props.cuisineTypes}
                                       selectedCuisine={this.props.restaurant.get('cuisine').get('id')}
                                       changeHandler={this.cuisineHandleChanged}/>
        <PriceRangeSelectionComponent priceRanges={this.props.priceRanges}
                                      selectedPriceRange={this.props.restaurant.get('price_range').get('id')}
                                      changeHandler={this.priceRangeHandleChanged}/>
        <label>Notes</label>
        <textarea className="notes" onChange={this.noteChanged} defaultValue={this.props.restaurant.get('notes')} />
      </div>
    )
  }
}
