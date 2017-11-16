// @flow
import firebase from '@firebase/app'
import '@firebase/database'
import '@firebase/auth'
import { call, select, takeEvery } from 'redux-saga/effects'
import CommandParser from './commandParser'
import type { FirebaseMessage } from 'firebase/types'

function* sendMessageWithResult(commandParser, action): Generator<*, *, *> {
  const { text } = action
  const ref = firebase.database().ref('messages')

  const name = yield select(state => state.user.profile.displayName)
  const result = commandParser.getMessageResult(text)

  const message: FirebaseMessage = {
    name,
    text,
    result,
    timestamp: firebase.database.ServerValue.TIMESTAMP
  }

  const sendMessage = () =>
    new Promise((resolve, reject) => {
      ref
        .push(message)
        .then(resolve)
        .catch(reject)
    })

  yield call(sendMessage)
}

export default function* sendMessages(): Generator<*, *, *> {
  const commandParser = new CommandParser()
  yield takeEvery('SEND_MESSAGE', sendMessageWithResult, commandParser)
}
