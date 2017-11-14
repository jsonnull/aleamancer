// @flow
import firebase from '@firebase/app'
import '@firebase/database'
import '@firebase/auth'
import type { FirebaseUserData } from './types'
import type { UserDataState } from 'reducers/user/data'

export function normalizeUserData(userData: ?FirebaseUserData): ?UserDataState {
  if (!userData) {
    return null
  }

  const { sessions } = userData
  const userSessions = {}

  for (let key in sessions) {
    if (sessions.hasOwnProperty(key)) {
      const sessionId = sessions[key]
      userSessions[key] = { sessionId }
    }
  }

  return {
    userSessions: userSessions
  }
}

export default function getCurrentUserData(): Promise<?UserDataState> {
  return new Promise((resolve, reject) => {
    const uid = firebase.auth().currentUser.uid
    firebase
      .database()
      .ref(`users/${uid}`)
      .once('value')
      .then(data => resolve(normalizeUserData(data.val())))
      .catch(reject)
  })
}
