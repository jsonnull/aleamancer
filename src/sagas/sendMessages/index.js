// @flow
import { call, select, takeEvery } from 'redux-saga/effects'
import CommandParser from './commandParser'
import { SEND_MESSAGE } from 'actions/types'
import type { MessageResult } from 'types'

export function* sendMessageWithResult(
  sendMessage: Function,
  commandParser: CommandParser,
  action
): Generator<*, *, *> {
  const { text } = action
  const name = yield select(state => state.user.profile.displayName)
  const result = commandParser.getMessageResult(text)

  const messageOptions = { text, name, result }

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
