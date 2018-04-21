// @flow
import reduce, { initialState } from '../currentUser'
import {
  updateUserProfile,
  hydrateUserProfile,
  changeDisplayName
} from 'frontend/actions'

const INIT_ACTION = { type: '@@INIT' }

describe('user profile reducer', () => {
  it('should have correct initial state', () => {
    expect(reduce(undefined, INIT_ACTION)).toEqual(initialState)
  })

  it('should handle UPDATE_USER_PROFILE', () => {
    const profile = {
      displayName: 'test',
      photoURL: ''
    }
    expect(reduce(undefined, updateUserProfile(profile))).toEqual({
      ...initialState,
      displayName: 'test',
      photoURL: ''
    })
  })

  it('should handle HYDRATE_USER_PROFILE', () => {
    const profile = {
      displayName: 'test',
      photoURL: ''
    }
    expect(reduce(undefined, hydrateUserProfile(profile))).toEqual({
      ...initialState,
      displayName: 'test',
      photoURL: ''
    })
  })

  it('should handle CHANGE_DISPLAY_NAME', () => {
    expect(reduce(undefined, changeDisplayName('test'))).toEqual({
      ...initialState,
      displayName: 'test'
    })
  })
})
