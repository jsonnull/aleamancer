// @flow
import type { MessagesSubscription } from '../types'
import type { Message } from 'types'

export const mockMessage = {
  key: 'test',
  from: 'testFrom',
  text: 'test message text',
  result: null,
  timestamp: 0
}

class Messages implements MessagesSubscription {
  constructor() {}

  onMessageData(callback: Function) {
    callback(mockMessage)
  }

  close() {}
}

const createSubscription = () => new Messages()

export default createSubscription
