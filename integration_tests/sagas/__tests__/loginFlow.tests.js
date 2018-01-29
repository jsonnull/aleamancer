// @flow
import setupStore from '../../setupStore'
import loginFunction from 'firebase/login'
import logoutFunction from 'firebase/logout'
import { performUserLogin } from 'actions'
import { APP_FINISHED_LOADING, PERFORM_USER_LOGOUT } from 'actions/types'

describe('login saga integration', () => {
  const store = setupStore()

  const loginAction = performUserLogin('test@email.com', 'password')
  store.dispatch({ type: APP_FINISHED_LOADING })
  store.dispatch(loginAction)

  it('should respond to PERFORM_USER_LOGIN instruction', () => {
    // $FlowJestError
    expect(loginFunction.calledWith(loginAction)).toBe(true)
  })

  store.dispatch({ type: PERFORM_USER_LOGOUT })
  it('should call logout function', () => {
    // $FlowJestError
    expect(logoutFunction.called).toBe(true)
  })

  it('should report user logged out', () => {
    expect(store.getState().ui.userIsLoggedIn === false)
  })
})
