// @flow
import firebase from '@firebase/app'
import '@firebase/firestore'
import type { DBGame } from 'common/types'

export const getMessagesByGameId = async (id: string, first: number) => {
  const collection = firebase
    .firestore()
    .collection(`messages`)
    .where('game', '==', id)
    .orderBy('timestamp', 'desc')
    .limit(20)

  const docs = await collection.get()

  const messages = []
  docs.forEach(doc =>
    messages.push({
      id: doc.id,
      ...doc.data()
    })
  )

  // Most recent messages arrive in order from latest to oldest, we reverse for
  // the frontend
  const reversed: Array<Object> = messages.reverse()
  return reversed
}

export const listenToNewMessages = (id: string) => (callback: Function) => {
  const query = firebase
    .firestore()
    .collection(`messages`)
    .where('game', '==', id)
    .orderBy('timestamp', 'desc')
    .limit(20)

  return Promise.resolve(
    query.onSnapshot(
      snapshot => {
        snapshot.docChanges.forEach(change => {
          if (change.type === 'added') {
            const message = {
              id: change.doc.id,
              ...change.doc.data({ serverTimestamps: 'estimate' })
            }
            callback(message)
          } else if (change.type === 'modified') {
          } else if (change.type === 'removed') {
          }
        })
      },
      error => {
        console.log('error in firebase sub', error)
      }
    )
  )
}

export const sendMessage = (id: string, text: string) => {
  const messagesCollection = firebase.firestore().collection(`messages`)

  const message = {
    from: 'jsonnull',
    result: null,
    text: text,
    game: id,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }

  const doc = messagesCollection.add(message)

  return {
    id: -1,
    ...message,
    timestamp: new Date()
  }
}
