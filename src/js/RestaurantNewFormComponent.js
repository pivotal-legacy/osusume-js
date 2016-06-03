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
    this.state = {
      selectedCuisine: 0,
      selectedPriceRange: 0,
      selectedPhoto: undefined
    }
  }

  componentDidMount() {
    this.props.fetchCuisineTypes()
    this.props.fetchPriceRanges()
  }

  renderSelectedSuggestion() {
    if (this.props.suggestion != undefined) {
      return (
        <div>
          <div>{this.props.suggestion.name}</div>
          <div>{this.props.suggestion.address}</div>
        </div>
      )
    } else {
      return null
    }
  }

  cuisineHandleChanged(value) {
    this.setState({selectedCuisine: value})
  }

  priceRangeHandleChanged(value) {
    this.setState({selectedPriceRange: value})
  }

  saveRestaurant() {
    this.props.addNewRestaurant(
      this.props.suggestion.name,
      this.props.suggestion.address,
      this.state.selectedCuisine,
      this.state.selectedPriceRange,
      this.state.selectedPhoto,
      this.props.fileUploader
    )
  }

  selectPhoto(e) {
    this.setState({selectedPhoto: e.target.files[0]})
  }

  render() {
    return (
      <div>
        <label>Add Photo</label>
        <input type="file" onChange={this.selectPhoto}/>
        {this.renderSelectedSuggestion()}
        <CuisineTypeSelectionComponent cuisineTypes={this.props.cuisineTypes} changeHandler={this.cuisineHandleChanged} />
        <PriceRangeSelectionComponent priceRanges={this.props.priceRanges} changeHandler={this.priceRangeHandleChanged}/>
          <button onClick={this.saveRestaurant}>save</button>
      </div>
    )
  }
}
