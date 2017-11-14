// @flow
import { call, put, takeEvery } from 'redux-saga/effects'
import loadSessionsWatcher, { loadSessions } from '../loadUserSessions'
import { hydrateUserData } from 'actions'
import { USER_LOGGED_IN } from 'actions/types'
import type { UserDataState } from 'reducers/user/data'

const mockUserData: UserDataState = {
  userSessions: {
    userSession1: { sessionId: 'globalSession1' },
    userSession2: { sessionId: 'globalSession2' }
  }
}
const mockGetUserData = () => new Promise(resolve => resolve(mockUserData))

describe('load sessions generator', () => {
  const gen = loadSessions(mockGetUserData)

  it('should call function to get user data', () => {
    expect(gen.next().value).toEqual(call(mockGetUserData))
  })

  it('should hydrate the store with user data', () => {
    expect(gen.next(mockUserData).value).toEqual(
      put(hydrateUserData(mockUserData))
    )
  })
})

describe('load sessions saga', () => {
  const gen = loadSessionsWatcher(mockGetUserData)

  it('should wait for USER_LOGGED_IN action', () => {
    expect(gen.next().value).toEqual(
      takeEvery(USER_LOGGED_IN, loadSessions, mockGetUserData)
    )
  })
})
