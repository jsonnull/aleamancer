// @flow
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
// Firebase DI
import getCurrentUserPreferences from 'firebase/getCurrentUserPreferences'
import saveCurrentUserPreferences from 'firebase/savePreferences'
import sendMessage from 'firebase/sendMessage'

export default function* rootSaga(): Generator<*, *, *> {
  yield fork(loadCurrentSession)
  yield fork(loadSessionMeta)
  yield fork(loadUserProfile)
  yield fork(loadUserSessions)
  yield fork(loginFlow)
  yield fork(receiveMessages)
  yield fork(saveUserProfile)
  yield fork(sendMessages, sendMessage)
  yield fork(switchSessions)
  // Preferences
  yield fork(loadPreferences, getCurrentUserPreferences)
  yield fork(savePreferences, saveCurrentUserPreferences)
}
