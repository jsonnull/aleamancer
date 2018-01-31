// @flow
import { take, call, put } from 'redux-saga/effects'
import { hydratePreferences } from 'actions'
import { USER_LOGGED_IN, APP_FINISHED_LOADING } from 'actions/types'
import loadPreferences from '../loadPreferences'
import getPreferences from 'firebase/getCurrentUserPreferences'

jest.mock('firebase/getCurrentUserPreferences')

const mockData = { theme: 'light', chatPinned: true }

describe('loadPreferences saga', () => {
  const gen = loadPreferences()

  it('should wait for USER_LOGGED_IN', () => {
    expect(gen.next().value).toEqual(take(USER_LOGGED_IN))
  })

  it('should call function to get user preferences', () => {
    expect(gen.next().value).toEqual(call(getPreferences))
  })

  it('should hydrate the redux store with preferences', () => {
    expect(gen.next(mockData).value).toEqual(put(hydratePreferences(mockData)))
  })

  it('should report the app has finished loading', () => {
    expect(gen.next().value).toEqual(put({ type: APP_FINISHED_LOADING }))
  })

  it('should listen for next login', () => {
    expect(gen.next().value).toEqual(take(USER_LOGGED_IN))
  })
})
