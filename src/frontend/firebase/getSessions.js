// @flow
import firebase from '@firebase/app'
import '@firebase/firestore'
import '@firebase/auth'
import type { SessionsState } from 'frontend/reducers/sessions'

export default function getSessions(): Promise<?SessionsState> {
  return new Promise((resolve, reject) => {
    const uid = firebase.auth().currentUser.uid
    const db = firebase.firestore()
    const usersCollection = db.collection('users')

    usersCollection
      .doc(uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          const data = doc.data().sessions.map(session => ({ id: session.id }))
          resolve(data)
        } else {
          throw new Error(`Could not get user data with id ${uid}`)
        }
      })
      .catch(reject)
  })
}
