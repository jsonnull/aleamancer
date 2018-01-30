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
import getSessionMeta from 'firebase/sessionMeta'
import getCurrentUserData from 'firebase/getCurrentUserData'
import getCurrentUserPreferences from 'firebase/getCurrentUserPreferences'
import getCurrentUserProfile from 'firebase/getCurrentUserProfile'
import createMessagesSubscription from 'firebase/messages'
import saveCurrentUserPreferences from 'firebase/savePreferences'
import getCurrentUserEmail from 'firebase/getCurrentUserEmail'
import saveProfile from 'firebase/saveProfile'
import sendMessage from 'firebase/sendMessage'

export default function* rootSaga(): Generator<*, *, *> {
  yield fork(loadCurrentSession)
  yield fork(loadSessionMeta, getSessionMeta)
  yield fork(loadUserSessions, getCurrentUserData)
  yield fork(loadUserProfile, getCurrentUserProfile)
  yield fork(loginFlow)
  yield fork(receiveMessages, createMessagesSubscription)
  yield fork(saveUserProfile, getCurrentUserEmail, saveProfile)
  yield fork(sendMessages, sendMessage)
  yield fork(switchSessions)
  // Preferences
  yield fork(loadPreferences, getCurrentUserPreferences)
  yield fork(savePreferences, saveCurrentUserPreferences)
}
