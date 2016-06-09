var expect = require('expect');

describe('restaurants', function() {
    it('shows list of restaurants and adds a restaurant', function () {
        browser.url('http://localhost:8000');

        expect(browser.getText('h1')).toEqual('login');
        var email = browser.element('.email');
        email.setValue('danny');
        var password = browser.element('.password');
        password.setValue('danny');
        browser.click('button');

        browser.waitForExist('.name');
        expect(browser.getText('h1')).toEqual('Restaurants');
        expect(browser.getText('.name')).toInclude('Butagumi');

        browser.click('button');

        expect(browser.getText('h1')).toEqual('find a restaurant');

        var input = browser.element('input');
        input.setValue('afuri');
        browser.click('button');
        browser.waitForExist('.restaurantSuggestion')
        browser.click('.restaurantSuggestion :nth-of-type(1)');

        var cusineSelect = browser.element('select:nth-of-type(1)');
        cusineSelect.selectByVisibleText('Japanese');
        var priceRangeSelect = browser.element('select:nth-of-type(2)');
        priceRangeSelect.selectByVisibleText('¥0~999');
        browser.click('button');

        expect(browser.getText('h1')).toEqual('Restaurants');
        browser.waitUntil(function() {
          return this.getText('.name').then(function(text) {
            return text[0] === 'ＡＦＵＲＩ'
          });
        });

        browser.click('.name')

        expect(browser.getText('h1')).toEqual('ＡＦＵＲＩ');
    });
});
