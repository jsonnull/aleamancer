// @flow
import firebase from '@firebase/app'
import '@firebase/firestore'
import type { DBGame } from 'common/types'

export const getGameById = async (id: string): Promise<DBGame> => {
  const db = firebase.firestore()
  const gamesCollection = db.collection('sessions')
  const ref = gamesCollection.doc(id)

  return getGameFromRef(ref)
}

export const getGameFromRef = async (ref: Object): Promise<DBGame> => {
  const doc = await ref.get()

  if (!doc.exists) {
    throw new Error(`Could not get game with id ${ref.id}`)
  }

  return {
    id: ref.id,
    ...doc.data()
  }
}
