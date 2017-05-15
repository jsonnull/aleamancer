/* @flow */
import * as firebase from 'firebase/app'
import 'firebase/database'
import { eventChannel } from 'redux-saga'
import { put, take } from 'redux-saga/effects'
import { receiveMessage } from 'actions'
import type { Message, FirebaseMessage } from 'types'

function messageFromFirebaseData (data: Object): Message {
  let firebaseMessage: FirebaseMessage = data.val()
  const { name, text, result, timestamp } = firebaseMessage

  const message: Message = {
    key: data.key,
    from: name,
    text,
    result,
    timestamp
  }

  return message
}

export default function * receiveMessages (): Generator<*, *, *> {
  // Wait for user auth to complete
  yield take('APP_FINISHED_LOADING')

  const listener = eventChannel(emit => {
    const ref = firebase.database().ref('messages')
    ref.orderByChild('timestamp')
       .limitToLast(12)
       .on('child_added', emit)

    return () => {
      ref.off()
    }
  })

  while (true) {
    const data = yield take(listener)
    const message = messageFromFirebaseData(data)
    yield put(receiveMessage(message))
  }
}
