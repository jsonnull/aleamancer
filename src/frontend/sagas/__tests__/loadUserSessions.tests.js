// @flow
import { call, put, takeEvery } from 'redux-saga/effects'
import loadSessionsWatcher, { loadSessions } from '../loadUserSessions'
import { hydrateSessionsList } from 'frontend/actions'
import { USER_LOGGED_IN } from 'frontend/actions/types'
import getSessions from 'frontend/firebase/getSessions'
import type { SessionsState } from 'frontend/reducers/sessions'

jest.mock('../../firebase/getSessions')

const mockSessionList: SessionsState = [
  { id: 'globalSession1' },
  { id: 'globalSession2' }
]

describe('load sessions generator', () => {
  const gen = loadSessions()

  it('should call function to get user data', () => {
    expect(gen.next().value).toEqual(call(getSessions))
  })

  it('should hydrate the store with user data', () => {
    expect(gen.next(mockSessionList).value).toEqual(
      put(hydrateSessionsList(mockSessionList))
    )
  })
})

describe('load sessions saga', () => {
  const gen = loadSessionsWatcher()

  it('should wait for USER_LOGGED_IN action', () => {
    expect(gen.next().value).toEqual(takeEvery(USER_LOGGED_IN, loadSessions))
  })
})
