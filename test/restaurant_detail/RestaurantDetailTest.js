import expect from 'expect'
import { mount, shallow } from 'enzyme'
import { Link } from 'react-router'

import React from 'react'
import RestaurantDetailPage from '../../src/js/restaurant_detail/RestaurantDetailPage'
import Comment from '../../src/js/restaurant_detail/Comment'
import CommentForm from '../../src/js/restaurant_detail/CommentForm'

describe('RestaurantDetailPage', () => {
  it('displays the restaurant passed in props', () => {
    let comments = [{
      comment: 'I love it',
      created_at: "2016-06-09T07:21:52.211Z",
      id: 1,
      user: {
        name: 'Danny'
      }
    }]
    let restaurant = {
      id: 0,
      name: 'Afuri',
      cuisine: {name: "Japanese"},
      price_range: {range: '¥0~999'},
      user: {id: 0, email: "danny", name: "Danny"},
      address: "Roppongi Hills",
      place_id: 'some-place-id',
      notes: "good",
      liked: false,
      photo_urls: [{url: 'https://hoge/image.jpg'}, {url: 'https://hoge/image2.jpg'}],
      num_likes: 5,
      created_at: "2016-05-26T10:03:17.736Z",
      updated_at: "2016-05-27T10:03:17.736Z"
    }
    let currentUser = {id: 0, name: 'Danny'}
    let createCommentCallback = function() {}
    let likeCallback = function() {}
    let removeLikeCallback = function() {}
    const component = shallow(<RestaurantDetailPage restaurant={restaurant} comments={comments} createComment={createCommentCallback} like={likeCallback} removeLike={removeLikeCallback} currentUser={currentUser}/>)
    expect(component.contains(<Link to='/'><button className='restaurant-link'>restaurants</button></Link>)).toBe(true)
    expect(component.contains(<h1>Afuri</h1>)).toBe(true)
    expect(component.contains(<img key={0} src='https://hoge/image.jpg' width={210}  />)).toBe(true)
    expect(component.contains(<img key={1} src='https://hoge/image2.jpg' width={210}  />)).toBe(true)
    expect(component.contains(<div className="cuisine">Japanese</div>)).toBe(true)
    expect(component.contains(<div className="price-range">¥0~999</div>)).toBe(true)
    expect(component.contains(<div className="date">5/27/2016 by Danny</div>)).toBe(true)
    expect(component.contains(<span>Roppongi Hills</span>)).toBe(true)
    expect(component.contains(<Link to='/restaurants/0/map/some-place-id'><button className='map-link'>view map</button></Link>)).toBe(true)
    expect(component.contains(<div className="notes">good</div>)).toBe(true)
    expect(component.contains(<span className="num-likes">5 likes</span>)).toBe(true)
    expect(component.contains(<button onClick={likeCallback}>like</button>)).toBe(true)
    expect(component.contains(<button onClick={removeLikeCallback}>remove like</button>)).toBe(false)
    expect(component.contains(<CommentForm createComment={createCommentCallback} />)).toBe(true)
    expect(component.contains(<Comment key={0} comment={comments[0]} />)).toBe(true)
  })

  it('shows delete button if restaurant is owned by current_user', () => {
    let props = {
      restaurant: {
        id: 0,
        name: 'Afuri',
        cuisine: {name: "Japanese"},
        price_range: {range: '¥0~999'},
        user: {id: 0, email: "danny", name: "Danny"}
      },
      deleteRestaurant: expect.createSpy(),
      currentUser: {id: 0, name: 'Danny'}
    }
    const component = shallow(<RestaurantDetailPage {...props} />)

    component.find(".delete-button").simulate("click")

    expect(props.deleteRestaurant).toHaveBeenCalled()
  })

  it('does not show delete button if restaurant is not owned by current_user', () => {
    let props = {
      restaurant: {
        id: 0,
        name: 'Afuri',
        cuisine: {name: "Japanese"},
        price_range: {range: '¥0~999'},
        user: {id: 0, email: "danny", name: "Danny"}
      },
      currentUser: {id: 1, name: 'Robert'}
    }
    const component = shallow(<RestaurantDetailPage {...props} />)

    expect(component.find(".delete-button").length).toEqual(0)
  })

  it('shows no images if there are no photo urls', () => {
    let props = {
      restaurant: {
        photo_urls: null,
        cuisine: {},
        price_range: {},
        user: {id: 0, email: "danny", name: "Danny"}
      },
      currentUser: {id: 0, name: 'Danny'}
    }
    const component = shallow(<RestaurantDetailPage {...props} />)
    expect(component.find('img').length).toEqual(0)
  })

  it('displays the remove like button when retaurant has been liked', () => {
    let props = {
      restaurant: {
        liked: true,
        price_range: {},
        cuisine: {},
        user: {id: 0, email: "danny", name: "Danny"}
      },
      currentUser: {id: 0, name: 'Danny'},
      like: () => {},
      removeLike: () => {}
    }
    const component = shallow(<RestaurantDetailPage {...props} />)
    expect(component.contains(<button onClick={props.removeLike}>remove like</button>)).toBe(true)
    expect(component.contains(<button onClick={props.like}>like</button>)).toBe(false)
  })

  it('displays likes pluralized correctly', () => {
    let propsNoLikes = {
      restaurant: {
        num_likes: 0,
        price_range: {},
        cuisine: {},
        user: {id: 0, email: "danny", name: "Danny"}
      },
      currentUser: {id: 0, name: 'Danny'}
    }
    expect(shallow(<RestaurantDetailPage {...propsNoLikes} />)
      .contains(<span className="num-likes">0 likes</span>)
    ).toBe(true)


    let propsOneLike = {
      restaurant: {
        num_likes: 1,
        price_range: {},
        cuisine: {},
        user: {id: 0, email: "danny", name: "Danny"}
      },
      currentUser: {id: 0, name: 'Danny'}
    }

    expect(shallow(<RestaurantDetailPage {...propsOneLike} />)
      .contains(<span className="num-likes">1 like</span>)
    ).toBe(true)

    let propsTwoLikes = {
      restaurant: {
        num_likes: 2,
        price_range: {},
        cuisine: {},
        user: {id: 0, email: "danny", name: "Danny"}
      },
      currentUser: {id: 0, name: 'Danny'}
    }

    expect(shallow(<RestaurantDetailPage {...propsTwoLikes} />)
      .contains(<span className="num-likes">2 likes</span>)
    ).toBe(true)
  })

  it('loads successfully without a restaurant', () => {
    const component = shallow(<RestaurantDetailPage restaurant={{}}/>)

    expect(component.renderer.getRenderOutput()).toBe(null)
  })

  it('fetches the restaurant', () => {
    let props = {
      fetchComments: expect.createSpy(),
      fetchRestaurant: expect.createSpy(),
      restaurant: {}
    }
    expect(props.fetchRestaurant.calls.length).toBe(0)
    mount(<RestaurantDetailPage {...props} />)
    expect(props.fetchRestaurant.calls.length).toBe(1)
  })
})
