// @flow
import { call, put, takeEvery } from 'redux-saga/effects'
import loadSessionsWatcher, { loadSessions } from '../loadUserSessions'
import { hydrateUserData } from 'actions'
import { USER_LOGGED_IN } from 'actions/types'
import getCurrentUserData from 'firebase/getCurrentUserData'
import type { UserDataState } from 'reducers/user/data'

jest.mock('firebase/getCurrentUserData')

const mockUserData: UserDataState = {
  sessions: [{ id: 'globalSession1' }, { id: 'globalSession2' }]
}

describe('load sessions generator', () => {
  const gen = loadSessions()

  it('should call function to get user data', () => {
    expect(gen.next().value).toEqual(call(getCurrentUserData))
  })

  it('should hydrate the store with user data', () => {
    expect(gen.next(mockUserData).value).toEqual(
      put(hydrateUserData(mockUserData))
    )
  })
})

describe('load sessions saga', () => {
  const gen = loadSessionsWatcher()

  it('should wait for USER_LOGGED_IN action', () => {
    expect(gen.next().value).toEqual(takeEvery(USER_LOGGED_IN, loadSessions))
  })
})
