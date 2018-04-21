// @flow
import { call, take } from 'redux-saga/effects'
import { CHANGE_THEME, TOGGLE_CHAT_PIN } from 'frontend/actions/types'
import savePreferences from '../savePreferences'
import mockSaveFunction from 'frontend/firebase/savePreferences'

jest.mock('frontend/firebase/savePreferences')

const mockData = { theme: 'light', chatPinned: true }

describe('savePreferences saga', () => {
  const gen = savePreferences()

  it('should wait for preferences to change', () => {
    expect(gen.next().value).toEqual(take([CHANGE_THEME, TOGGLE_CHAT_PIN]))
  })

  it('should select the preferences state from the store', () => {
    expect(gen.next().value).toHaveProperty('SELECT')
  })

  it('should call the function to save preferences', () => {
    expect(gen.next(mockData).value).toEqual(call(mockSaveFunction, mockData))
  })

  it('should continue listening', () => {
    expect(gen.next().done).toBe(false)
  })
})
