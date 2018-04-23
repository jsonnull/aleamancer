// @flow
import firebase from '@firebase/app'
import '@firebase/firestore'
import '@firebase/auth'
import type { MessageResult } from 'common/types'
import type { FirebaseMessage } from 'frontend/firebase/types'

type SendMessageOpts = {
  from: string,
  text: string,
  result: ?MessageResult
}

const sendMessage = (opts: SendMessageOpts): Promise<void> => {
  return new Promise((resolve, reject) => {
    const db = firebase.firestore()
    const messagesCollection = db.collection('messages')

    const message: FirebaseMessage = {
      ...opts,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }

    messagesCollection
      .add(message)
      .then(resolve)
      .catch(reject)
  })
}

export default sendMessage