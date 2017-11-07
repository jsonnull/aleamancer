// @flow
import setupStore from './setupStore'
import { logoutFunction } from './setupSagas'
import {
  USER_LOGGED_IN,
  PERFORM_USER_LOGOUT,
  USER_LOGGED_OUT
} from 'actions/types'

describe('logout saga', () => {
  const store = setupStore()

  store.dispatch({ type: USER_LOGGED_IN })
  store.dispatch({ type: PERFORM_USER_LOGOUT })

  it('should call logout function', () => {
    expect(logoutFunction.called).toBe(true)
  })

  it('should report user logged out', () => {
    expect(store.getState().ui.userIsLoggedIn === false)
  })
})
