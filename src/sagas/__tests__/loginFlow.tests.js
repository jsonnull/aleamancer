// @flow
import { take, call, put, select } from 'redux-saga/effects'
import { performUserLogin } from 'actions'
import {
  APP_FINISHED_LOADING,
  PERFORM_USER_LOGIN,
  PERFORM_USER_LOGOUT,
  USER_LOGGED_IN,
  USER_LOGGED_OUT
} from 'actions/types'
import loginFlow from '../loginFlow'

describe('login saga', () => {
  const loginFunction = () => {}
  const logoutFunction = () => {}
  const gen = loginFlow(loginFunction, logoutFunction)

  it('should wait for app to finish loading', () => {
    expect(gen.next().value).toEqual(take(APP_FINISHED_LOADING))
  })

  it('should get the users login state', () => {
    expect(gen.next().value).toHaveProperty('SELECT')
  })

  const waitingForAction = take([
    USER_LOGGED_IN,
    PERFORM_USER_LOGIN,
    PERFORM_USER_LOGOUT
  ])
  it('should wait for login, logout, or USER_LOGGED_IN', () => {
    expect(gen.next(false).value).toEqual(waitingForAction)
  })

  const loginAction = performUserLogin('test@example.com', 'password')
  it('should perform login', () => {
    expect(gen.next(loginAction).value).toHaveProperty('CALL.fn', loginFunction)
  })

  it('should ignore additional login instructions', () => {
    const userLoggedInAction = { type: USER_LOGGED_IN }
    // Set the generator to waiting
    expect(gen.next().value).toEqual(waitingForAction)
    // Set user to be logged in
    expect(gen.next(userLoggedInAction).value).toEqual(waitingForAction)
    // Additional login attempts have no effect
    expect(gen.next(loginAction).value).toEqual(waitingForAction)
    expect(gen.next(loginAction).value).toEqual(waitingForAction)
  })

  const logoutAction = { type: PERFORM_USER_LOGOUT }
  it('should perform logout', () => {
    expect(gen.next(logoutAction).value).toHaveProperty(
      'CALL.fn',
      logoutFunction
    )
  })

  it('should report user logged out', () => {
    expect(gen.next().value).toEqual(put({ type: USER_LOGGED_OUT }))
  })

  it('should continue', () => {
    expect(gen.next().value).toEqual(waitingForAction)
  })
})
