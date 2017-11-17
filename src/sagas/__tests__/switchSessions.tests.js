// @flow
import slug from 'slugg'
import { put, select, takeEvery } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'
import { push } from 'react-router-redux'
import { changeSidebarTab } from 'actions'
import { SWITCH_TO_SESSION } from 'actions/types'
import switchSessions, { switchToSession } from '../switchSessions'
import type { SessionList, SessionInfo } from 'types'

describe('switchToSession generator', () => {
  const mockId = 'testId'
  const switchAction = { type: SWITCH_TO_SESSION, sessionId: mockId }
  const gen = cloneableGenerator(switchToSession)(switchAction)

  const doNothing = gen.clone()
  it('should get the current session id from the store', () => {
    expect(doNothing.next().value).toHaveProperty('SELECT')
  })

  it('should do nothing if the current session is the same', () => {
    expect(doNothing.next(mockId).done).toBe(true)
  })

  const switchGen = gen.clone()
  it('should get list of sessions available to switch to', () => {
    expect(switchGen.next().value).toHaveProperty('SELECT')
  })

  it('should get list of sessions available to switch to', () => {
    expect(switchGen.next().value).toHaveProperty('SELECT')
  })

  const sessionList: SessionList = {
    userSessionId: {
      sessionId: mockId,
      meta: {
        name: 'session name'
      }
    }
  }
  it('should redirect the user to the session', () => {
    expect(switchGen.next(sessionList).value).toEqual(
      put(push(`/g/${mockId}/${slug('session name')}`))
    )
  })

  it('should change the sidebar tab', () => {
    expect(switchGen.next().value).toEqual(put(changeSidebarTab('Session')))
  })

  it('should be finished', () => {
    expect(switchGen.next().done).toBe(true)
  })
})

describe('switchSessions saga', () => {
  const gen = switchSessions()
  it('should respond to every SWITCH_TO_SESSION action', () => {
    expect(gen.next().value).toEqual(
      takeEvery(SWITCH_TO_SESSION, switchToSession)
    )
  })
})
