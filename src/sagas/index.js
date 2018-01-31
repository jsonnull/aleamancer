// @flow
import type { Saga } from 'redux-saga'
import { fork } from 'redux-saga/effects'
import loadCurrentSession from './loadCurrentSession'
import loadSessionMeta from './loadSessionMeta'
import loadUserSessions from './loadUserSessions'
import loadPreferences from './preferences/loadPreferences'
import savePreferences from './preferences/savePreferences'
import loadUserProfile from './loadUserProfile'
import loginFlow from './loginFlow'
import receiveMessages from './receiveMessages'
import saveUserProfile from './saveUserProfile'
import sendMessages from './sendMessages'
import switchSessions from './switchSessions'

export default function* rootSaga(): Saga<void> {
  yield fork(loadCurrentSession)
  yield fork(loadSessionMeta)
  yield fork(loadUserProfile)
  yield fork(loadUserSessions)
  yield fork(loginFlow)
  yield fork(receiveMessages)
  yield fork(saveUserProfile)
  yield fork(sendMessages)
  yield fork(switchSessions)
  // Preferences
  yield fork(loadPreferences)
  yield fork(savePreferences)
}
