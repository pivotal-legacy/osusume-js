import React from 'react'

export default function MapComponent(props) {
  let baseUrl = "https://www.google.com/maps/embed/v1/place"
  let location = "?q=Harrods,Brompton%20Rd,%20UK"
  let zoom = "&zoom=17"
  let key = "&key=" + process.env.GOOGLE_PLACES_KEY
  return (
    <div>
      <h1>location</h1>
      <iframe src={baseUrl + location + zoom + key}></iframe>
    </div>
  )
}
