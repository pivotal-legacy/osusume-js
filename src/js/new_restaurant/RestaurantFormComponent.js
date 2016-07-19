import React from 'react'
import CuisineTypeSelectionComponent from './CuisineTypeSelectionComponent'
import PriceRangeSelectionComponent from './PriceRangeSelectionComponent'
import PhotoPickerComponent from './PhotoPickerComponent'
import SelectedRestaurantComponent from './SelectedRestaurantComponent'

export default class RestaurantNewFormComponent extends React.Component {
  constructor(props) {
    super(props)
    this.cuisineHandleChanged = this.cuisineHandleChanged.bind(this)
    this.priceRangeHandleChanged = this.priceRangeHandleChanged.bind(this)
    this.saveRestaurant = this.saveRestaurant.bind(this)
    this.selectPhotos = this.selectPhotos.bind(this)
    this.noteChanged = this.noteChanged.bind(this)
    this.state = {
      selectedCuisine: 0,
      selectedPriceRange: 0,
      notes: '',
      selectedPhotos: [],
      selectPhotoNames: []
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
      this.state.selectedPhotos,
      this.props.fileUploader
    )
  }

  selectPhotos(photoFiles) {
    this.setState({selectedPhotos: photoFiles})
  }

  renderRestaurantSuggestionSection() {
    if (this.props.suggestion) {
      return (<SelectedRestaurantComponent suggestion={this.props.suggestion} />)
    } else {
      return (
        <button className='find-restaurant' onClick={this.props.findRestaurantClicked}>
          find restaurant
        </button>
      )
    }
  }

  render() {
    return (
      <div className='stacked-form'>
        <h1>add a restaurant</h1>
        {this.renderRestaurantSuggestionSection()}
        <CuisineTypeSelectionComponent cuisineTypes={this.props.cuisineTypes} changeHandler={this.cuisineHandleChanged} />
        <PriceRangeSelectionComponent priceRanges={this.props.priceRanges} changeHandler={this.priceRangeHandleChanged}/>
        <PhotoPickerComponent selectedPhotos={this.state.selectedPhotos} selectPhotos={this.selectPhotos}/>
        <label>Notes</label>
        <textarea className="notes" onChange={this.noteChanged}></textarea>
        <button className='save-restaurant' onClick={this.saveRestaurant}>save</button>
      </div>
    )
  }
}
