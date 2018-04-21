// @flow
import type { Saga } from 'redux-saga'
import { call, select, takeEvery } from 'redux-saga/effects'
import { SEND_MESSAGE } from 'frontend/actions/types'
import type { Action } from 'frontend/actions/types'
import currentUser from 'frontend/selectors/currentUser'
import sendMessage from 'frontend/firebase/sendMessage'
import CommandParser from './commandParser'

export function* sendMessageWithResult(
  commandParser: CommandParser,
  action: Action
): Saga<void> {
  if (action.type !== SEND_MESSAGE) {
    return
  }

  const { text } = action
  const user = yield select(currentUser)
  const from = user.displayName
  const result = commandParser.getMessageResult(text)

  const messageOptions = { text, from, result }

  yield call(sendMessage, messageOptions)
}

export default function* sendMessages(): Saga<void> {
  const commandParser = new CommandParser()
  yield takeEvery(SEND_MESSAGE, sendMessageWithResult, commandParser)
}
