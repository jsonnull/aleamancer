// @flow
import firebase from '@firebase/app'
import '@firebase/firestore'
import '@firebase/auth'
import type { UserPreferencesState } from 'reducers/user/preferences'

const savePreferences = (preferences: UserPreferencesState) => {
  const uid = firebase.auth().currentUser.uid
  const db = firebase.firestore()
  const preferencesCollection = db.collection('preferences')

  preferencesCollection.doc(uid).set(preferences, { merge: true })
}

export default savePreferences
