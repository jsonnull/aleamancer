// @flow
import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'
import type { UserPreferencesState } from 'reducers/user/preferences'

const getUserPreferences = (): Promise<UserPreferencesState> => {
  const uid = firebase.auth().currentUser.uid
  const ref = firebase.database().ref(`prefs/${uid}`)
  return new Promise((resolve, reject) => {
    ref
      .once('value')
      .then(data => resolve(data.val()))
      .catch(reject)
  })
}

export default getUserPreferences
