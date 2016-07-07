import expect from 'expect'
import React from 'react'
import {Link} from 'react-router'
import {shallow} from 'enzyme'

import MapComponent from '../../src/js/map/MapComponent'

describe('MapComponent', () => {
  it('displays right map', () => {
    let component = shallow(<MapComponent params={{place_id: "some-place-id"}} />)
    let expectedSrc = `https://www.google.com/maps/embed/v1/place?q=place_id:some-place-id&zoom=17&key=${process.env.GOOGLE_PLACES_KEY}`

    expect(component.contains(<iframe src={expectedSrc}></iframe>)).toBe(true)
  })

  it('displays a link to the restaurant detail screen', () => {
    let component = shallow(<MapComponent params={{place_id: "some-place-id", restaurant_id: 1}} />)

    expect(component.contains(<Link to='/restaurants/1'><button>details</button></Link>)).toBe(true)
  })
})
