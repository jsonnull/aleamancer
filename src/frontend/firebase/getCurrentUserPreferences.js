// @flow
import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/firestore'
import type { PreferencesState } from 'frontend/reducers/preferences'

const getUserPreferences = (): Promise<PreferencesState> => {
  return new Promise((resolve, reject) => {
    const uid = firebase.auth().currentUser.uid
    const db = firebase.firestore()
    const preferencesCollection = db.collection('preferences')

    preferencesCollection
      .doc(uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          resolve(doc.data())
        } else {
          throw new Error('could not get user preferences')
        }
      })
      .catch(reject)
  })
}

export default getUserPreferences
