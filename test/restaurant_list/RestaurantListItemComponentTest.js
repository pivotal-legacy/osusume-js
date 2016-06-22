import expect from 'expect'
import { shallow } from 'enzyme'
import { Link } from 'react-router'

import React from 'react'
import RestaurantListItemComponent from '../../src/js/restaurant_list/RestaurantListItemComponent'

describe('RestaurantListItemComponent', () => {
  it('displays the restaurant passed in props', () => {
    let restaurant = {
      id: 0,
      name: 'Afuri',
      cuisine: {name: 'Ramen'},
      price_range: {range: '1000 - 2000'},
      address: 'Iidabashi West Exit',
      num_likes: 3,
      photo_urls: [{url: 'https://hoge/image.jpg'}],
      created_by_user_name: 'Kalle Anka',
      created_at: '2016-05-25T01:41:17.125Z',
      updated_at: '2016-05-26T10:03:17.736Z'

    }
    const component = shallow(<RestaurantListItemComponent restaurant={restaurant} />)

    expect(component.find(Link).prop('to')).toEqual('/restaurants/0')
    expect(component.find('.name').text()).toEqual('Afuri')
    expect(component.find('.cuisine').text()).toEqual('Ramen')
    expect(component.find('.price-range').text()).toEqual('1000 - 2000')
    expect(component.find('.number-likes').text()).toEqual('3 likes')
    expect(component.find('img').length).toEqual(1)
    expect(component.find('.updated-at').text()).toEqual('5/26/2016')
  })

  it('displays no photo is there are no photos', () => {
    let restaurant = {
      id: 0,
      name: 'Afuri',
      cuisine: {},
      price_range: {},
      photo_urls: []
    }
    const component = shallow(<RestaurantListItemComponent restaurant={restaurant} />)
    expect(component.find('img').length).toEqual(0)
  })
})
