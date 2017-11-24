// @flow
import { call, put, takeLatest } from 'redux-saga/effects'
import { hydrateSessionMeta } from 'actions'
import { HYDRATE_USER_DATA } from 'actions/types'
import loadMeta, { loadAllMeta, loadSessionMeta } from '../loadSessionMeta'

const mockData = { name: 'test' }
const mockGetSessionMeta = () => new Promise(resolve => resolve(mockData))

describe('loadSessionMeta generator', () => {
  const gen = loadSessionMeta(mockGetSessionMeta, 'sessionId')

  it('should call getSessionMeta', () => {
    expect(gen.next().value).toEqual(call(mockGetSessionMeta, 'sessionId'))
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
  const gen = loadAllMeta(mockGetSessionMeta)

  const sessions = [{ id: 'session1' }, { id: 'session2' }]

  it('should get an object of session ids from the user', () => {
    expect(gen.next().value).toHaveProperty('SELECT')
  })

  it('should yield an `all` effect to get session meta', () => {
    expect(gen.next(sessions).value).toHaveProperty('ALL', [
      call(loadSessionMeta, mockGetSessionMeta, 'session1'),
      call(loadSessionMeta, mockGetSessionMeta, 'session2')
    ])
  })

  it('should be done', () => {
    expect(gen.next().done).toBe(true)
  })
})

describe('loadMeta saga', () => {
  const gen = loadMeta(mockGetSessionMeta)

  it('should wait for HYDRATE_USER_DATA instruction', () => {
    expect(gen.next().value).toEqual(
      takeLatest(HYDRATE_USER_DATA, loadAllMeta, mockGetSessionMeta)
    )
  })

  it('should be done', () => {
    expect(gen.next().done).toBe(true)
  })
})
