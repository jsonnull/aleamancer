// @flow
import firebase from '@firebase/app'
import '@firebase/database'
import '@firebase/auth'
import type { FirebaseMessage } from 'firebase/types'
import type { MessageResult } from 'types'

type SendMessageOpts = {
  name: string,
  text: string,
  result: ?MessageResult
}

const sendMessage = (opts: SendMessageOpts) => {
  const ref = firebase.database().ref('messages')

  const message: FirebaseMessage = {
    ...opts,
    timestamp: firebase.database.ServerValue.TIMESTAMP
  }

  return new Promise((resolve, reject) => {
    ref
      .push(message)
      .then(resolve)
      .catch(reject)
  })
}

export default sendMessage
