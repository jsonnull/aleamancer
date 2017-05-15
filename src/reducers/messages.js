/* @flow */
import type { Action } from '../actions/types'
import type { Message } from 'types'

export type MessagesState = Array<Message>

const initialState = []

export default function reducer (state: MessagesState = initialState, action: Action) {
  switch (action.type) {
    case 'RECEIVE_MESSAGE':
      const isMessageInState = state.findIndex(message => message.key === action.message.key) !== -1
      return (!isMessageInState ? state.concat(action.message) : state)
    default:
      return state
  }
}
