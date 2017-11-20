// @flow
import setupStore from '../../setupStore'
import { loginFunction, logoutFunction } from '../../setupSagas'
import { performUserLogin } from 'actions'
import { PERFORM_USER_LOGOUT } from 'actions/types'

describe('login saga integration', () => {
  const store = setupStore()

  const loginAction = performUserLogin('test@email.com', 'password')
  store.dispatch(loginAction)

  it('should respond to PERFORM_USER_LOGIN instruction', () => {
    expect(loginFunction.calledWith(loginAction)).toBe(true)
  })

  store.dispatch({ type: PERFORM_USER_LOGOUT })
  it('should call logout function', () => {
    expect(logoutFunction.called).toBe(true)
  })

  it('should report user logged out', () => {
    expect(store.getState().ui.userIsLoggedIn === false)
  })
})
