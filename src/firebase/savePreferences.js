// @flow
import firebase from '@firebase/app'
import '@firebase/database'
import '@firebase/auth'
import type { UserPreferencesState } from 'reducers/user/preferences'

const savePreferences = (preferences: UserPreferencesState) => {
  const uid = firebase.auth().currentUser.uid
  const ref = firebase.database().ref(`prefs/${uid}`)
  ref.set(preferences)
}

export default savePreferences
