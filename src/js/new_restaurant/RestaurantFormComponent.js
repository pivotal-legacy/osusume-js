import React from 'react'
import CuisineTypeSelectionComponent from './CuisineTypeSelectionComponent'
import PriceRangeSelectionComponent from './PriceRangeSelectionComponent'

export default class RestaurantNewFormComponent extends React.Component {
  constructor(props) {
    super(props)
    this.cuisineHandleChanged = this.cuisineHandleChanged.bind(this)
    this.priceRangeHandleChanged = this.priceRangeHandleChanged.bind(this)
    this.saveRestaurant = this.saveRestaurant.bind(this)
    this.selectPhoto = this.selectPhoto.bind(this)
    this.noteChanged = this.noteChanged.bind(this)
    this.state = {
      selectedCuisine: 0,
      selectedPriceRange: 0,
      notes: '',
      selectedPhoto: undefined
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

  saveRestaurant() {
    this.props.addNewRestaurant(
      {
        name: this.props.suggestion.get('name'),
        address: this.props.suggestion.get('address'),
        cuisine_id: this.state.selectedCuisine,
        price_range_id: this.state.selectedPriceRange,
        notes: this.state.notes,
        place_id: this.props.suggestion.get('place_id'),
        latitude: this.props.suggestion.get('latitude'),
        longitude: this.props.suggestion.get('longitude')
      },
      this.state.selectedPhoto,
      this.props.fileUploader
    )
  }

  selectPhoto(e) {
    this.setState({selectedPhoto: e.target.files[0]})
  }

  renderRestaurantSuggestionSection() {
    if (this.props.suggestion) {
      return (
        <div className='restaurant-suggestion'>
          <div>{this.props.suggestion.get('name')}</div>
          <div>{this.props.suggestion.get('address')}</div>
        </div>
      )
    } else {
      return (
        <div>
          <button className='find-restaurant' onClick={this.props.findRestaurantClicked}>
            find restaurant
          </button>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <h1>add a restaurant</h1>
        <label>Add Photo</label>
        <input type="file" onChange={this.selectPhoto}/>
        {this.renderRestaurantSuggestionSection()}
        <CuisineTypeSelectionComponent cuisineTypes={this.props.cuisineTypes} changeHandler={this.cuisineHandleChanged} />
        <PriceRangeSelectionComponent priceRanges={this.props.priceRanges} changeHandler={this.priceRangeHandleChanged}/>
        <div>
          <label>Notes</label>
          <textarea className="notes" onChange={this.noteChanged}></textarea>
        </div>

        <button onClick={this.saveRestaurant}>save</button>
      </div>
    )
  }
}
