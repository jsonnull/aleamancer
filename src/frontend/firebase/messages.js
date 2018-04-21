// @flow
import firebase from '@firebase/app'
import '@firebase/firestore'
import type { MessagesSubscription } from 'frontend/firebase/types'

export default class Messages implements MessagesSubscription {
  query: Object
  unsubscribe: ?Function

  constructor() {
    this.query = firebase
      .firestore()
      .collection('messages')
      .orderBy('timestamp')
      .limit(20)
  }

  onMessageData(callback: Function) {
    this.unsubscribe = this.query.onSnapshot(
      snapshot => {
        snapshot.docChanges.forEach(change => {
          if (change.type === 'added') {
            const message = {
              id: change.doc.id,
              ...change.doc.data()
            }
            callback(message)
          } else if (change.type === 'modified') {
          } else if (change.type === 'removed') {
          }
        })
      },
      error => {
        console.log(error)
      }
    )
  }

  close() {
    if (this.unsubscribe) {
      this.unsubscribe()
      this.unsubscribe = null
    }
  }
}
