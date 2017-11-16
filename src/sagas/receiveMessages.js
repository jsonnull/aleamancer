// @flow
import { eventChannel } from 'redux-saga'
import { put, take, fork, cancel, cancelled } from 'redux-saga/effects'
import { receiveMessage } from 'actions'
import { USER_LOGGED_IN, USER_LOGGED_OUT } from 'actions/types'
import type { Message } from 'types'
import type { MessagesSubscription } from 'firebase/types'

export function* subscribeToMessages(
  subscription: MessagesSubscription
): Generator<*, *, *> {
  const listener = eventChannel(emit => {
    // Subscribe to message data
    subscription.onMessageData(emit)
    // Return a function to close the messages
    return () => subscription.close()
  })

  try {
    while (true) {
      const message = yield take(listener)
      yield put(receiveMessage(message))
    }
  } finally {
    if (yield cancelled()) {
      listener.close()
    }
  }
}

export default function* receiveMessages(
  createMessagesSubscription: () => MessagesSubscription
): Generator<*, *, *> {
  let currentSubscription = null

  while (true) {
    // Listen for changes on user auth
    const action = yield take([USER_LOGGED_IN, USER_LOGGED_OUT])

    if (action.type === USER_LOGGED_IN) {
      // If user is logged in, create a subscription to messages
      const subscription = createMessagesSubscription()
      currentSubscription = yield fork(subscribeToMessages, subscription)
    } else if (action.type === USER_LOGGED_OUT) {
      // If user is logged out, cancel the subscription
      if (currentSubscription) {
        yield cancel(currentSubscription)
        currentSubscription = null
      }
    }
  }
}
