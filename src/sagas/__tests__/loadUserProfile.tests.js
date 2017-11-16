// @flow
import { take, call, put } from 'redux-saga/effects'
import { hydrateUserProfile } from 'actions'
import { USER_LOGGED_IN } from 'actions/types'
import loadUserProfile from '../loadUserProfile'
import type { UserProfileState } from 'reducers/user/profile'

const mockData = { displayName: 'test_user', photoURL: undefined }
const mockGetProfile = () => mockData

describe('loadUserProfile saga', () => {
  const gen = loadUserProfile(mockGetProfile)

  it('should wait for USER_LOGGED_IN', () => {
    expect(gen.next().value).toEqual(take(USER_LOGGED_IN))
  })

  it('should call function to get user profile', () => {
    expect(gen.next().value).toEqual(call(mockGetProfile))
  })

  it('should hydrate the redux store with profile', () => {
    expect(gen.next(mockData).value).toEqual(put(hydrateUserProfile(mockData)))
  })

  it('should listen for next login', () => {
    expect(gen.next().value).toEqual(take(USER_LOGGED_IN))
  })
})
