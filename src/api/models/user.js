// @flow
import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/firestore'
import type { DBUser } from 'common/types'

export const getUserById = async (id: string): Promise<DBUser> => {
  const db = firebase.firestore()
  const usersCollection = db.collection('users')
  const doc = await usersCollection.doc(id).get()

  if (!doc.exists) {
    throw new Error(`Could not get user with id ${id}`)
  }

  return {
    id: id,
    ...doc.data()
  }
}

export const getCurrentUser = async () => {
  const uid = firebase.auth().currentUser.uid

  return getUserById(uid)
}
