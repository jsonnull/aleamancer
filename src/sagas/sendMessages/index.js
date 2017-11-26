// @flow
import { call, select, takeEvery } from 'redux-saga/effects'
import CommandParser from './commandParser'
import { SEND_MESSAGE } from 'actions/types'
import type { Action } from 'actions/types'

export function* sendMessageWithResult(
  sendMessage: Function,
  commandParser: CommandParser,
  action: Action
): Generator<*, *, *> {
  if (action.type !== SEND_MESSAGE) {
    return
  }

  const { text } = action
  const from = yield select(state => state.user.profile.displayName)
  const result = commandParser.getMessageResult(text)

  const messageOptions = { text, from, result }

  yield call(sendMessage, messageOptions)
}

export default function* sendMessages(
  sendMessage: Function
): Generator<*, *, *> {
  const commandParser = new CommandParser()
  yield takeEvery(
    SEND_MESSAGE,
    sendMessageWithResult,
    sendMessage,
    commandParser
  )
}
