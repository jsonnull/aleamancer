// @flow
import reduce from '../sessions'
import { hydrateSessionMeta, hydrateSessionsList } from 'frontend/actions'
import type { SessionMeta } from 'common/types'

const INIT_ACTION = { type: '@@INIT' }

const DEFAULT_STATE = []

describe('user data reducer', () => {
  it('should have correct initial state', () => {
    expect(reduce(undefined, INIT_ACTION)).toEqual(DEFAULT_STATE)
  })

  it('should handle HYDRATE_SESSIONS_LIST', () => {
    const sessionsList = [{ id: 'session1' }, { id: 'session2' }]

    expect(reduce(undefined, hydrateSessionsList(sessionsList))).toEqual(
      sessionsList
    )
  })

  it('should handle HYDRATE_SESSION_META', () => {
    const state = [{ id: 'session1' }]
    const sessionMeta: SessionMeta = { name: 'test' }

    const finalState = reduce(
      state,
      hydrateSessionMeta('session1', sessionMeta)
    )

    expect(finalState).toEqual([{ id: 'session1', meta: sessionMeta }])
  })
})
