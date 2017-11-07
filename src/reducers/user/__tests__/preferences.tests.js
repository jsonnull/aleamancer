// @flow
import reduce from '../preferences'
import * as types from 'actions/types'
import { changeTheme, hydratePreferences } from 'actions'

const INIT_ACTION = { type: '@@INIT' }

const DEFAULT_STATE = {
  theme: 'light',
  chatPinned: false
}

describe('user preferences reducer', () => {
  it('should have correct initial state', () => {
    expect(reduce(undefined, INIT_ACTION)).toEqual(DEFAULT_STATE)
  })

  it('should handle CHANGE_THEME', () => {
    expect(reduce(undefined, changeTheme('dark'))).toEqual({
      ...DEFAULT_STATE,
      theme: 'dark'
    })
  })

  it('should handle TOGGLE_CHAT_PIN', () => {
    expect(reduce(undefined, { type: types.TOGGLE_CHAT_PIN })).toEqual({
      ...DEFAULT_STATE,
      chatPinned: !DEFAULT_STATE.chatPinned
    })
  })

  it('should handle HYDRATE_PREFERENCES', () => {
    const preferences = {
      theme: 'dark',
      chatPinned: true
    }
    expect(reduce(undefined, hydratePreferences(preferences))).toEqual(
      preferences
    )
  })
})
