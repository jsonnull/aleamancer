// @flow
import { take, call, put } from 'redux-saga/effects'
import { hydrateUserProfile } from 'actions'
import { USER_LOGGED_IN } from 'actions/types'
import loadUserProfile from '../loadUserProfile'
import getUserProfile from 'firebase/getCurrentUserProfile'

jest.mock('firebase/getCurrentUserProfile')

const mockId = 'testUserId'
const mockAction = { type: USER_LOGGED_IN, id: mockId }
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
    expect(gen.next(mockData).value).toEqual(
      put(hydrateUserProfile(mockId, mockData))
    )
  })

  it('should listen for next login', () => {
    expect(gen.next().value).toEqual(take(USER_LOGGED_IN))
  })
})
