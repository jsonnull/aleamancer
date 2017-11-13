// @flow
import { take, call, put } from 'redux-saga/effects'
import {
  PERFORM_USER_LOGIN,
  PERFORM_USER_LOGOUT,
  USER_LOGGED_OUT
} from 'actions/types'
import loginFlow from '../loginFlow'

describe('login saga', () => {
  const loginFunction = () => {}
  const logoutFunction = () => {}
  const gen = loginFlow(loginFunction, logoutFunction)

  it('should wait for PERFORM_USER_LOGIN instruction', () => {
    expect(gen.next().value).toEqual(take(PERFORM_USER_LOGIN))
  })

  it('should perform login', () => {
    expect(gen.next().value).toHaveProperty('CALL.fn', loginFunction)
  })

  it('should wait for PERFORM_USER_LOGOUT instruction', () => {
    expect(gen.next().value).toEqual(take(PERFORM_USER_LOGOUT))
  })

  it('should perform logout', () => {
    expect(gen.next().value).toHaveProperty('CALL.fn', logoutFunction)
  })

  it('should report user logged out', () => {
    expect(gen.next().value).toEqual(put({ type: USER_LOGGED_OUT }))
  })

  it('should continue', () => {
    expect(gen.next().done).toBe(false)
  })
})
