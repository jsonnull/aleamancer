// @flow
import firebase from '@firebase/app'
import '@firebase/database'
import { eventChannel } from 'redux-saga'
import { take, put, select, fork, cancel, cancelled } from 'redux-saga/effects'
import selectCurrentSessionId from 'selectors/sessionId'
import { hydrateSession } from 'actions'
import type { Action } from 'actions/types'

function createSubscription(sessionId: string) {
  const subscription = eventChannel(emit => {
    const ref = firebase.database().ref(`sessions/${sessionId}`)

    ref.on('value', sessionSnapshot => {
      emit(sessionSnapshot.val())
    })

    return () => {
      ref.off()
    }
  })

  return subscription
}

function* subscribeToSession(sessionId): Generator<Object, *, *> {
  console.log(`subscribing to session ${sessionId}`)
  const subscription = createSubscription(sessionId)

  try {
    while (true) {
      const sessionData = yield take(subscription)
      yield put(hydrateSession(sessionData))
    }
  } finally {
    if (yield cancelled()) {
      console.log('closing subscription')
      subscription.close()
    }
  }
}

export default function* loadCurrentSession(): Generator<*, *, *> {
  let currentSubscription = null
  let currentSessionId = null

  while (true) {
    const action: Action = yield take([
      'USER_LOGGED_IN',
      'SWITCH_TO_SESSION',
      'USER_LOGGED_OUT'
    ])

    if (action.type === 'USER_LOGGED_OUT' && currentSubscription) {
      yield cancel(currentSubscription)
      continue
    }

    // Find out what the target session id is
    let newSessionId = yield select(selectCurrentSessionId)
    if (action.type === 'SWITCH_TO_SESSION') {
      newSessionId = action.sessionId
    }

    // If the user has switched to a different session, change subscriptions
    const isNewSession = currentSessionId !== newSessionId
    if (isNewSession) {
      if (currentSubscription) {
        yield cancel(currentSubscription)
      }

      currentSessionId = newSessionId
      currentSubscription = yield fork(subscribeToSession, newSessionId)
    }
  }
}
