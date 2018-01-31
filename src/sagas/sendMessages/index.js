// @flow
import type { Saga } from 'redux-saga'
import { call, select, takeEvery } from 'redux-saga/effects'
import CommandParser from './commandParser'
import { SEND_MESSAGE } from 'actions/types'
import type { Action } from 'actions/types'
import sendMessage from 'firebase/sendMessage'

export function* sendMessageWithResult(
  commandParser: CommandParser,
  action: Action
): Saga<void> {
  if (action.type !== SEND_MESSAGE) {
    return
  }

  const { text } = action
  const from = yield select(state => state.user.profile.displayName)
  const result = commandParser.getMessageResult(text)

  const messageOptions = { text, from, result }

  yield call(sendMessage, messageOptions)
}

export default function* sendMessages(): Saga<void> {
  const commandParser = new CommandParser()
  yield takeEvery(SEND_MESSAGE, sendMessageWithResult, commandParser)
}
