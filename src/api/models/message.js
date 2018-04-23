// @flow
import firebase from '@firebase/app'
import '@firebase/firestore'
import type { DBGame } from 'common/types'

export const getMessagesByGameId = async (id: string, first: number) => {
  const collection = firebase
    .firestore()
    .collection(`sessions/${id}/messages`)
    .orderBy('timestamp')
    .limit(20)

  const docs = await collection.get()

  const messages = []
  docs.forEach(doc =>
    messages.push({
      id: doc.id,
      ...doc.data()
    })
  )
  return messages
}
