// @flow
import reduce from '../data'
import { hydrateUserData, hydrateSessionMeta } from 'actions'
import type { SessionMeta } from 'types'

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
        session1: { sessionId: 'session1' },
        session2: { sessionId: 'session2' }
      }
    }

    expect(reduce(undefined, hydrateUserData(userData))).toEqual(userData)
  })

  it('should handle HYDRATE_SESSION_META', () => {
    const state = { userSessions: { session1: { sessionId: 'session1' } } }
    const sessionMeta: SessionMeta = { name: 'test' }

    const finalState = reduce(
      state,
      hydrateSessionMeta('session1', sessionMeta)
    )

    expect(finalState).toEqual({
      userSessions: { session1: { sessionId: 'session1', meta: sessionMeta } }
    })
  })
})
