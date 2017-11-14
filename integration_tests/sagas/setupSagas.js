// @flow
import sinon from 'sinon'
import { fork } from 'redux-saga/effects'
import loadCurrentSession from '../../src/sagas/loadCurrentSession'
import loadSessionMeta from '../../src/sagas/loadSessionMeta'
import loadUserSessions from '../../src/sagas/loadUserSessions'
import loadUserPreferences from '../../src/sagas/loadUserPreferences'
import loadUserProfile from '../../src/sagas/loadUserProfile'
import loginFlow from '../../src/sagas/loginFlow'
import receiveMessages from '../../src/sagas/receiveMessages'
import saveUserPreferences from '../../src/sagas/saveUserPreferences'
import saveUserProfile from '../../src/sagas/saveUserProfile'
import sendMessages from '../../src/sagas/sendMessages'
import switchSessions from '../../src/sagas/switchSessions'

export const loginFunction = sinon.spy()
export const logoutFunction = sinon.spy()

export default function* rootSaga(): Generator<*, *, *> {
  // yield fork(loadCurrentSession)
  // yield fork(loadSessionMeta)
  // yield fork(loadSessions)
  // yield fork(loadUserPreferences)
  // yield fork(loadUserProfile)
  yield fork(loginFlow, loginFunction, logoutFunction)
  // yield fork(receiveMessages)
  // yield fork(saveUserPreferences)
  // yield fork(saveUserProfile)
  // yield fork(sendMessages)
  // yield fork(switchSessions)
}
