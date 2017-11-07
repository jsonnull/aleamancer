// @flow
import reduce from '../data'
import { hydrateUserData, hydrateSessionMeta } from 'actions'

const INIT_ACTION = { type: '@@INIT' }

const DEFAULT_STATE = {
  userSessions: {}
}

describe('user data reducer', () => {
  it('should have correct initial state', () => {
    expect(reduce(undefined, INIT_ACTION)).toEqual(DEFAULT_STATE)
  })

  it('should handle HYDRATE_USER_DATA', () => {
    const userData = {
      userSessions: {
        session1: {},
        session2: {}
      }
    }

    expect(reduce(undefined, hydrateUserData(userData))).toEqual(userData)
  })

  it('should handle HYDRATE_SESSION_META', () => {
    const state = { userSessions: { session1: {} } }

    const finalState = reduce(
      state,
      hydrateSessionMeta('session1', { test: 'test' })
    )

    expect(finalState).toEqual({
      userSessions: { session1: { meta: { test: 'test' } } }
    })
  })
})
