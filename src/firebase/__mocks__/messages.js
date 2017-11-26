// @flow
import type { MessagesSubscription } from '../types'

export const mockMessage = {
  id: 'test',
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
