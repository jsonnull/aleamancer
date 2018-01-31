// @flow
import { fork } from 'redux-saga/effects'
//import loadCurrentSession from '../src/sagas/loadCurrentSession'
//import loadSessionMeta from '../src/sagas/loadSessionMeta'
//import loadUserSessions from '../src/sagas/loadUserSessions'
//import loadUserPreferences from '../src/sagas/loadUserPreferences'
//import loadUserProfile from '../src/sagas/loadUserProfile'
import loginFlow from '../src/sagas/loginFlow'
//import receiveMessages from '../src/sagas/receiveMessages'
//import saveUserPreferences from '../src/sagas/saveUserPreferences'
//import saveUserProfile from '../src/sagas/saveUserProfile'
//import sendMessages from '../src/sagas/sendMessages'
import switchSessions from '../src/sagas/switchSessions'

// Mock implementations
jest.mock('firebase/session')
jest.mock('firebase/getSessionMeta')
jest.mock('firebase/getCurrentUserPreferences')
jest.mock('firebase/getCurrentUserProfile')
jest.mock('firebase/getCurrentUserData')
jest.mock('firebase/messages')
jest.mock('firebase/getCurrentUserEmail')
jest.mock('firebase/savePreferences')
jest.mock('firebase/saveProfile')
jest.mock('firebase/sendMessage')
jest.mock('firebase/login')
jest.mock('firebase/logout')

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
