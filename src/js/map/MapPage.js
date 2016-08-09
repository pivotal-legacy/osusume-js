import React from 'react'
import {Link} from 'react-router'

export default function MapPage(props) {
  let baseUrl = "https://www.google.com/maps/embed/v1/place"
  let location = "?q=place_id:" + props.params.place_id
  let zoom = "&zoom=17"
  let key = "&key=" + process.env.GOOGLE_PLACES_KEY
  return (
    <div>
      <div>
      <span>location</span>
        <Link to={`/restaurants/${props.params.restaurant_id}`}>
          <button>details</button>
        </Link>
      </div>
      <iframe src={baseUrl + location + zoom + key}></iframe>
    </div>
  )
}
