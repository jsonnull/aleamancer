// @flow
import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/firestore'

export const getPreferencesForCurrentUser = async () => {
  const uid = firebase.auth().currentUser.uid

  return getPreferencesById(uid)
}

export const getPreferencesById = async (id: string) => {
  const db = firebase.firestore()
  const preferencesCollection = db.collection('preferences')

  const doc = await preferencesCollection.doc(id).get()

  if (!doc.exists) {
    throw new Error(`Could not get preferences for user with id ${id}`)
  }

  return doc.data()
}
