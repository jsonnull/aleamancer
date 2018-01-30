// @flow
import { take, put } from 'redux-saga/effects'
import { createMockTask, cloneableGenerator } from 'redux-saga/utils'
import { switchToSession, hydrateSession } from 'actions'
import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  SWITCH_TO_SESSION
} from 'actions/types'
import loadCurrentSession, { subscribeToSession } from '../loadCurrentSession'

jest.mock('firebase/session')

describe('loadCurrentSession saga', () => {
  const start = cloneableGenerator(loadCurrentSession)()

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
    const forkedTask = createMockTask()
    expect(full.next(forkedTask).value).toEqual(
      take([USER_LOGGED_IN, SWITCH_TO_SESSION, USER_LOGGED_OUT])
    )
  })

  const switchAction = switchToSession('newSessionId')
  it('should be able to switch sessions', () => {
    expect(full.next(switchAction).value).toHaveProperty('SELECT')
    expect(full.next().value).toHaveProperty('CANCEL')
    expect(full.next().value).toHaveProperty('FORK')
  })

  it('should continue', () => {
    expect(full.next().done).toBe(false)
  })
})

describe('subscribeToSession generator', () => {
  const subscription = subscribeToSession('fakeSessionId')

  it('should wait for event from the channel', () => {
    expect(subscription.next().value).toHaveProperty('TAKE')
  })

  it('should put the session data', () => {
    const mockSessionData = { data: 'test' }
    expect(subscription.next(mockSessionData).value).toEqual(
      put(hydrateSession(mockSessionData))
    )
  })

  it('should continue', () => {
    expect(subscription.next().done).toBe(false)
  })
})
