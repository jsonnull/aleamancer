// @flow
import { take, call, select } from 'redux-saga/effects'
import { CHANGE_THEME, TOGGLE_CHAT_PIN } from 'actions/types'
import saveUserPreferences from '../saveUserPreferences'
import type { UserPreferencesState } from 'reducers/user/preferences'

describe('saveUserPreferences saga', () => {
  const mockSaveFunction = (preferences: UserPreferencesState) => {}
  const gen = saveUserPreferences(mockSaveFunction)

  it('should wait for preferences to change', () => {
    expect(gen.next().value).toEqual(take([CHANGE_THEME, TOGGLE_CHAT_PIN]))
  })

  it('should select the preferences state from the store', () => {
    expect(gen.next().value).toHaveProperty('SELECT')
  })

  it('should call the function to save preferences', () => {
    expect(gen.next().value).toEqual(call(mockSaveFunction, undefined))
  })

  it('should continue listening', () => {
    expect(gen.next().done).toBe(false)
  })
})
