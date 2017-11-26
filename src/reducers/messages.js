// @flow
import * as types from 'actions/types'
import type { Action } from '../actions/types'
import type { Message } from 'types'

export type MessagesState = Array<Message>

const initialState = []

export default function reducer(
  state: MessagesState = initialState,
  action: Action
) {
  switch (action.type) {
    case types.RECEIVE_MESSAGE:
      const message = action.message
      const isMessageInState =
        state.findIndex(el => el.id === message.id) !== -1
      if (!isMessageInState) {
        return state.concat(message)
      }
      return state
    default:
      return state
  }
}
