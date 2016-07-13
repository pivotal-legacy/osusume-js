import React from 'react'
import RestaurantSearchResultComponent from './RestaurantSearchResultComponent'

export default function RestaurantSearchComponent(props) {
  let input
  let suggestions = (props.suggestions.map((suggestion) => {
    return (
      <RestaurantSearchResultComponent key={suggestion.get('place_id')}
                                       suggestion={suggestion}
                                       restaurantSuggestionSelected={props.restaurantSuggestionSelected}/>
    )
  }))
  return (
    <div>
      <h1>find a restaurant</h1>
      <input ref={node => {input = node}}/>
      <button onClick={_ => {props.fetchSuggestions(input.value)}}>find</button>
      {suggestions}
    </div>
  )
}
