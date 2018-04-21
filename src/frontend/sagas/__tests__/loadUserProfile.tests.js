// @flow
import { call, put, take } from 'redux-saga/effects'
import { hydrateUserProfile } from 'frontend/actions'
import { USER_LOGGED_IN } from 'frontend/actions/types'
import loadUserProfile from '../loadUserProfile'
import getUserProfile from 'frontend/firebase/getCurrentUserProfile'

jest.mock('../../firebase/getCurrentUserProfile')

const mockAction = { type: USER_LOGGED_IN }
const mockData = { displayName: 'test_user', photoURL: null }

describe('loadUserProfile saga', () => {
  const gen = loadUserProfile()

  it('should wait for USER_LOGGED_IN', () => {
    expect(gen.next().value).toEqual(take(USER_LOGGED_IN))
  })

  it('should call function to get user profile', () => {
    expect(gen.next(mockAction).value).toEqual(call(getUserProfile))
  })

  it('should hydrate the redux store with profile', () => {
    expect(gen.next(mockData).value).toEqual(put(hydrateUserProfile(mockData)))
  })

  it('should listen for next login', () => {
    expect(gen.next().value).toEqual(take(USER_LOGGED_IN))
  })
})
