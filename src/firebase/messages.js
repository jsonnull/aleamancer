// @flow
import firebase from '@firebase/app'
import '@firebase/database'
import type { MessagesSubscription, Ref, FirebaseMessage } from './types'
import type { Message } from 'types'

export function messageFromFirebaseData(
  data: FirebaseMessage,
  key: string
): Message {
  const { name, text, result, timestamp } = data

  const message: Message = {
    key,
    from: name,
    text,
    result,
    timestamp
  }

  return message
}

class Messages implements MessagesSubscription {
  ref: Ref

  constructor() {
    this.ref = firebase.database().ref('messages')
  }

  onMessageData(callback: Function) {
    this.ref
      .orderByChild('timestamp')
      .limitToLast(20)
      .on('child_added', data => {
        const message = messageFromFirebaseData(data.val(), data.key)
        callback(message)
      })
  }

  close() {
    this.ref.off()
  }
}

const createSubscription = () => new Messages()

export default createSubscription
