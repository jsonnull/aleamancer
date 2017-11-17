// @flow
import { messageFromFirebaseData } from '../messages'
import type { FirebaseMessage } from '../types'
import type { Message } from 'types'

describe('messageFromFirebaseData utility function', () => {
  const messageKey = 'key'

  const firebaseMessage: FirebaseMessage = {
    name: 'name',
    result: null,
    text: 'text',
    timestamp: 0
  }

  const message: Message = {
    key: messageKey,
    from: 'name',
    result: null,
    text: 'text',
    timestamp: 0
  }

  it('should convert firebase data into our message format', () => {
    expect(messageFromFirebaseData(firebaseMessage, messageKey)).toEqual(
      message
    )
  })
})
