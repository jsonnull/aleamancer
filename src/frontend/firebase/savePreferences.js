// @flow
import firebase from '@firebase/app'
import '@firebase/firestore'
import '@firebase/auth'
import type { PreferencesState } from 'frontend/reducers/preferences'

const savePreferences = (preferences: PreferencesState) => {
  const uid = firebase.auth().currentUser.uid
  const db = firebase.firestore()
  const preferencesCollection = db.collection('preferences')

  preferencesCollection.doc(uid).set(preferences, { merge: true })
}

export default savePreferences
