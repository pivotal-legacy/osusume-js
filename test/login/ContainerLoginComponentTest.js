import expect from 'expect'
import * as actions from '../../src/js/actions/Actions'
import { mapDispatchToProps } from '../../src/js/login/ContainerLoginComponent'

describe('ContainerLoginComponent', () => {
  afterEach(function () {
    expect.restoreSpies()
  })

  it('mapDispatchToProps login', () => {
    let dispatch = expect.createSpy()
    let email = 'danny@pivotal.io'
    let password = 'password'
    var spy = expect.spyOn(actions, 'login')

    mapDispatchToProps(dispatch).login(email, password)
    expect(spy).toHaveBeenCalledWith(email, password)
    expect(dispatch).toHaveBeenCalledWith(actions.login())
  })
})
