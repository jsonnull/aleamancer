// @flow
import type { Saga } from 'redux-saga'
import { eventChannel } from 'redux-saga'
import { cancel, cancelled, fork, put, take } from 'redux-saga/effects'
import { receiveMessage } from 'frontend/actions'
import { USER_LOGGED_IN, USER_LOGGED_OUT } from 'frontend/actions/types'
import Messages from 'frontend/firebase/messages'

export function* subscribeToMessages(): Saga<void> {
  const subscription = new Messages()

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

export default function* receiveMessages(): Saga<void> {
  let currentSubscription = null

  while (true) {
    // Listen for changes on user auth
    const action = yield take([USER_LOGGED_IN, USER_LOGGED_OUT])

    if (action.type === USER_LOGGED_IN) {
      // If user is logged in, create a subscription to messages
      currentSubscription = yield fork(subscribeToMessages)
    } else if (action.type === USER_LOGGED_OUT) {
      // If user is logged out, cancel the subscription
      if (currentSubscription) {
        yield cancel(currentSubscription)
        currentSubscription = null
      }
    }
  }
}
