// @flow
import { fork } from 'redux-saga/effects'
//import loadCurrentSession from '../src/sagas/loadCurrentSession'
//import loadSessionMeta from '../src/sagas/loadSessionMeta'
//import loadUserSessions from '../src/sagas/loadUserSessions'
//import loadUserPreferences from '../src/sagas/loadUserPreferences'
//import loadUserProfile from '../src/sagas/loadUserProfile'
import loginFlow from 'frontend/sagas/loginFlow'
//import receiveMessages from '../src/sagas/receiveMessages'
//import saveUserPreferences from '../src/sagas/saveUserPreferences'
//import saveUserProfile from '../src/sagas/saveUserProfile'
//import sendMessages from '../src/sagas/sendMessages'
import switchSessions from 'frontend/sagas/switchSessions'

// Mock implementations
jest.mock('frontend/firebase/session')
jest.mock('frontend/firebase/getSessionMeta')
jest.mock('frontend/firebase/getCurrentUserPreferences')
jest.mock('frontend/firebase/getCurrentUserProfile')
jest.mock('frontend/firebase/getSessions')
jest.mock('frontend/firebase/messages')
jest.mock('frontend/firebase/savePreferences')
jest.mock('frontend/firebase/saveProfile')
jest.mock('frontend/firebase/sendMessage')
jest.mock('frontend/firebase/login')
jest.mock('frontend/firebase/logout')

export default function* rootSaga(): Generator<*, *, *> {
  // yield fork(loadCurrentSession)
  // yield fork(loadSessionMeta)
  // yield fork(loadSessions)
  // yield fork(loadUserPreferences)
  // yield fork(loadUserProfile)
  yield fork(loginFlow)
  // yield fork(receiveMessages)
  // yield fork(saveUserPreferences)
  // yield fork(saveUserProfile)
  // yield fork(sendMessages)
  yield fork(switchSessions)
}
