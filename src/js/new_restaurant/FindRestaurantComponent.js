import React from 'react'
import RestaurantSuggestionComponent from './RestaurantSuggestionComponent'

export default function FindRestaurantComponent(props) {
  let input
  let suggestions = (props.suggestions.map((suggestion) => {
    return (
      <RestaurantSuggestionComponent key={suggestion.get('name')}
                                     suggestion={suggestion}
                                     selectSuggestion={props.selectSuggestion}/>
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
