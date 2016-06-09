import expect from 'expect'
import {requireAuth} from '../../src/js/login/Authentication'

describe('Authentication', () => {
  it('redirects to login if there is no saved auth token', () => {
    localStorage.clear();

    let redirectTo = expect.createSpy();

    requireAuth(null, redirectTo);

    expect(redirectTo).toHaveBeenCalledWith({pathname: '/login', state: {}});
  });
})
