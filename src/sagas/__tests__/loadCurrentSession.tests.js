// @flow
import { take } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'
import { switchToSession } from 'actions'
import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  SWITCH_TO_SESSION
} from 'actions/types'
import loadCurrentSession from '../loadCurrentSession'

describe('loadCurrentSession saga', () => {
  const createSession = () => {}
  const start = cloneableGenerator(loadCurrentSession)(createSession)

  const firstAction = start.clone()
  it('should wait for login, logout, or switch session instructions', () => {
    expect(firstAction.next().value).toEqual(
      take([USER_LOGGED_IN, SWITCH_TO_SESSION, USER_LOGGED_OUT])
    )
  })

  const loginAction = { type: USER_LOGGED_IN }
  const full = start.clone()
  it('should wait for session ID on login', () => {
    full.next()
    expect(full.next(loginAction).value).toHaveProperty('SELECT')
  })

  it('should create a new session', () => {
    expect(full.next('sessionId').value).toHaveProperty('FORK')
  })

  it('should be ready for next action', () => {
    expect(full.next().value).toEqual(
      take([USER_LOGGED_IN, SWITCH_TO_SESSION, USER_LOGGED_OUT])
    )
  })

  const switchAction = switchToSession('newSessionId')
  it('should be able to switch sessions', () => {
    expect(full.next(switchAction).value).toHaveProperty('SELECT')
    // Normally it would cancel here, but because the saga middleware is not
    // running, `currentSubscription` is undefined
    expect(full.next().value).toHaveProperty('FORK')
  })

  it('should continue', () => {
    expect(full.next().done).toBe(false)
  })
})
