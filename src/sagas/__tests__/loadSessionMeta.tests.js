// @flow
import { call, put, takeLatest } from 'redux-saga/effects'
import { hydrateSessionMeta } from 'actions'
import { HYDRATE_USER_DATA } from 'actions/types'
import loadMeta, { loadAllMeta, loadSessionMeta } from '../loadSessionMeta'
import getSessionMeta from 'firebase/getSessionMeta'

jest.mock('firebase/getSessionMeta')

const mockData = { name: 'test' }

describe('loadSessionMeta generator', () => {
  const gen = loadSessionMeta('sessionId')

  it('should call getSessionMeta', () => {
    expect(gen.next().value).toEqual(call(getSessionMeta, 'sessionId'))
  })

  it('should hydrate the store with the meta', () => {
    expect(gen.next(mockData).value).toEqual(
      put(hydrateSessionMeta('sessionId', mockData))
    )
  })

  it('should be done', () => {
    expect(gen.next().done).toBe(true)
  })
})

describe('loadAllMeta generator', () => {
  const gen = loadAllMeta()

  const sessions = [{ id: 'session1' }, { id: 'session2' }]

  // Asking for a list of sessions
  it('should get an object of session ids from the user', () => {
    expect(gen.next().value).toHaveProperty('SELECT')
  })

  // Get meta for all sessions
  it('should yield an `all` effect to get session meta', () => {
    expect(gen.next(sessions).value).toHaveProperty('ALL', [
      call(loadSessionMeta, 'session1'),
      call(loadSessionMeta, 'session2')
    ])
  })

  it('should be done', () => {
    expect(gen.next().done).toBe(true)
  })
})

describe('loadMeta saga', () => {
  const gen = loadMeta()

  it('should wait for HYDRATE_USER_DATA instruction', () => {
    expect(gen.next().value).toEqual(takeLatest(HYDRATE_USER_DATA, loadAllMeta))
  })

  it('should be done', () => {
    expect(gen.next().done).toBe(true)
  })
})
