var expect = require('expect');

describe('restaurants', function () {
  const login = () => {
    expect(browser.getText('h1')).toEqual('login');
    var email = browser.element('.email');
    email.setValue('danny');
    var password = browser.element('.password');
    password.setValue('danny');
    browser.click('button');
  }

  const seeRestaurantList = () => {
    browser.waitForExist('.name');
    expect(browser.getText('h1')).toEqual('Restaurants');
    expect(browser.getText('.name')).toInclude('Butagumi');
  }

  const addRestaurant = () => {
    browser.click('button');

    expect(browser.getText('h1')).toEqual('add a restaurant');

    browser.click('.find-restaurant');

    expect(browser.getText('h1')).toEqual('find a restaurant');

    var input = browser.element('input');
    input.setValue('afuri');
    browser.click('button');
    browser.waitForExist('.restaurant-suggestion')
    browser.click('.restaurant-suggestion :nth-of-type(1)');

    expect(browser.getText('h1')).toEqual('add a restaurant');

    var cusineSelect = browser.element('select.cuisine');
    cusineSelect.selectByVisibleText('Japanese');
    var priceRangeSelect = browser.element('select.price-range');
    priceRangeSelect.selectByVisibleText('¥0~999');
    browser.click('button.save-restaurant');
  }

  const viewNewRestaurantDetails = () => {
    browser.waitUntil(function() {
      return this.getText('h1').then(function(text) {
        return text === 'Restaurants';
      })
    });

    expect(browser.getText('.name')).toContain('AFURI Ebisu');

    browser.click('.name')

    browser.waitUntil(function() {
      return this.getText('h1').then(function(text) {
        return text === 'AFURI Ebisu';
      })
    });
  }

  const addComment = () => {
    var input = browser.element('Input');
    input.setValue('new comment');
    browser.submitForm('form');
    browser.waitForExist('.comment')

    expect(browser.getText('.comment div')).toInclude('new comment');
    expect(browser.getText('.comment span')).toInclude('Danny');
  }

  const likeAndRemoveLike = () => {
    browser.click('.likes button');

    expect(browser.getText('.num-likes')).toInclude('1');
    expect(browser.getText('.likes button')).toInclude('remove like');

    browser.click('.likes button');

    expect(browser.getText('.num-likes')).toInclude('0');
    expect(browser.getText('.likes button')).toInclude('like');
  }

  const editRestaurant = () => {
    browser.click('button.edit-details')

    expect(browser.getText('h1')).toEqual('edit a restaurant')
    expect(browser.getText('h2')).toEqual('AFURI Ebisu')

    var cusineSelect = browser.element('select.cuisine')
    cusineSelect.selectByVisibleText('Chinese')

    var priceRangeSelect = browser.element('select.price-range')
    priceRangeSelect.selectByVisibleText('¥1000~1999')

    browser.back()
    // browser.click('button.save-restaurant');
  }

  const logout = () => {
    browser.waitForExist('.restaurant-link')
    browser.click('.restaurant-link');
    browser.waitForExist('.my-page-link')
    browser.click('.my-page-link');
    browser.click('.logout');
    browser.waitUntil(function () {
      return this.getText('h1').then(function (text) {
        return text === 'login';
      })
    });
  }

  it('shows list of restaurants and adds a restaurant', function () {
    browser.url('http://localhost:8000');

    login();

    seeRestaurantList();

    addRestaurant();

    viewNewRestaurantDetails();

    addComment();

    likeAndRemoveLike();

    editRestaurant();

    logout();
  });
});
