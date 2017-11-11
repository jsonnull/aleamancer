// @flow
import reduce from '../profile'
import * as types from 'actions/types'
import {
  updateUserProfile,
  hydrateUserProfile,
  changeDisplayName
} from 'actions'

const INIT_ACTION = { type: '@@INIT' }

const DEFAULT_STATE = {
  displayName: 'anonymous',
  photoURL: ''
}

describe('user profile reducer', () => {
  it('should have correct initial state', () => {
    expect(reduce(undefined, INIT_ACTION)).toEqual(DEFAULT_STATE)
  })

  it('should handle UPDATE_USER_PROFILE', () => {
    const profile = {
      displayName: 'test',
      photoURL: ''
    }
    expect(reduce(undefined, updateUserProfile(profile))).toEqual({
      ...DEFAULT_STATE,
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
      ...DEFAULT_STATE,
      displayName: 'test',
      photoURL: ''
    })
  })

  it('should handle CHANGE_DISPLAY_NAME', () => {
    expect(reduce(undefined, changeDisplayName('test'))).toEqual({
      ...DEFAULT_STATE,
      displayName: 'test'
    })
  })
})
