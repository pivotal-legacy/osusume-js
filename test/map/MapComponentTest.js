import expect from 'expect'
import React from 'react'
import {shallow} from 'enzyme'

import MapComponent from '../../src/js/map/MapComponent'

describe('MapComponent', () => {
  it('displays right map', () => {
    let component = shallow(<MapComponent place_id="some-place-id" />)
    let expectedSrc = `https://www.google.com/maps/embed/v1/place?q=place_id:some-place-id&zoom=17&key=${process.env.GOOGLE_PLACES_KEY}`
    expect(component.contains(<iframe src={expectedSrc} className="map-component"></iframe>)).toBe(true)
  })
})
