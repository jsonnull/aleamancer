// @flow
import { fork } from 'redux-saga/effects'
import loadCurrentSession from './loadCurrentSession'
import loadSessionMeta from './loadSessionMeta'
import loadSessions from './loadSessions'
import loadUserPreferences from './loadUserPreferences'
import loadUserProfile from './loadUserProfile'
import loginFlow from './loginFlow'
import receiveMessages from './receiveMessages'
import saveUserPreferences from './saveUserPreferences'
import saveUserProfile from './saveUserProfile'
import sendMessages from './sendMessages'
import switchSessions from './switchSessions'
import loginFunction from 'firebase/login'
import logoutFunction from 'firebase/logout'
import createSession from 'firebase/session'
import getSessionMeta from 'firebase/sessionMeta'

export default function* rootSaga(): Generator<*, *, *> {
  yield fork(loadCurrentSession, createSession)
  yield fork(loadSessionMeta, getSessionMeta)
  yield fork(loadSessions)
  yield fork(loadUserPreferences)
  yield fork(loadUserProfile)
  yield fork(loginFlow, loginFunction, logoutFunction)
  yield fork(receiveMessages)
  yield fork(saveUserPreferences)
  yield fork(saveUserProfile)
  yield fork(sendMessages)
  yield fork(switchSessions)
}
