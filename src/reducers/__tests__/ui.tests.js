// @flow
import reduce from '../ui'
import * as actions from 'actions'
import * as types from 'actions/types'

const INIT_ACTION = { type: '@@INIT' }

const DEFAULT_STATE = {
  appIsLoading: true,
  userIsLoggedIn: false,
  showSettings: false
}

describe('ui reducer', () => {
  it('should have correct initial state', () => {
    expect(reduce(undefined, INIT_ACTION)).toEqual(DEFAULT_STATE)
  })

  it('should handle APP_FINISHED_LOADING', () => {
    expect(reduce(undefined, { type: types.APP_FINISHED_LOADING })).toEqual({
      ...DEFAULT_STATE,
      appIsLoading: false
    })
  })

  it('should handle USER_LOGGED_IN', () => {
    expect(reduce(undefined, { type: types.USER_LOGGED_IN })).toEqual({
      ...DEFAULT_STATE,
      userIsLoggedIn: true
    })
  })

  it('should handle USER_LOGGED_OUT', () => {
    expect(reduce(undefined, { type: types.USER_LOGGED_OUT })).toEqual({
      ...DEFAULT_STATE,
      userIsLoggedIn: false
    })
  })

  it('should handle SHOW_SETTINGS', () => {
    expect(reduce(undefined, { type: types.SHOW_SETTINGS })).toEqual({
      ...DEFAULT_STATE,
      showSettings: true
    })
  })

  it('should handle HIDE_SETTINGS', () => {
    expect(reduce(undefined, { type: types.HIDE_SETTINGS })).toEqual({
      ...DEFAULT_STATE,
      showSettings: false
    })
  })
})
