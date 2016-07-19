import React from 'react'
import CuisineTypeSelectionComponent from './CuisineTypeSelectionComponent'
import PriceRangeSelectionComponent from './PriceRangeSelectionComponent'
import ListComponent from './ListComponent'

export default class RestaurantNewFormComponent extends React.Component {
  constructor(props) {
    super(props)
    this.cuisineHandleChanged = this.cuisineHandleChanged.bind(this)
    this.priceRangeHandleChanged = this.priceRangeHandleChanged.bind(this)
    this.saveRestaurant = this.saveRestaurant.bind(this)
    this.selectPhoto = this.selectPhoto.bind(this)
    this.noteChanged = this.noteChanged.bind(this)
    this.openPhotoLibrary = this.openPhotoLibrary.bind(this)
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

  selectPhoto(e) {
    var photoNames = []
    for (var i = 0; i < e.target.files.length; i++) {
      photoNames.push(e.target.files[i].name)
    }

    this.setState({selectedPhotoNames: photoNames})
    this.setState({selectedPhotos: e.target.files})
  }

  renderRestaurantSuggestionSection() {
    if (this.props.suggestion) {
      return (
        <div className='selected-restaurant'>
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

  openPhotoLibrary() {
    document.getElementById('file-input').click()
  }

  render() {
    return (
      <div className='stacked-form'>
        <h1>add a restaurant</h1>
        {this.renderRestaurantSuggestionSection()}
        <CuisineTypeSelectionComponent cuisineTypes={this.props.cuisineTypes} changeHandler={this.cuisineHandleChanged} />
        <PriceRangeSelectionComponent priceRanges={this.props.priceRanges} changeHandler={this.priceRangeHandleChanged}/>
        <label>Add Photo</label>
        <ListComponent items={this.state.selectedPhotoNames} />
        <input id="file-input" className="file-input" type="file" multiple="multiple" onChange={this.selectPhoto}/>
        <input type="button" value="select photos" onClick={this.openPhotoLibrary} />
        <label>Notes</label>
        <textarea className="notes" onChange={this.noteChanged}></textarea>
        <button onClick={this.saveRestaurant}>save</button>
      </div>
    )
  }
}
