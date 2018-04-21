// @flow
import { eventChannel } from 'redux-saga'
import type { Saga } from 'redux-saga'
import { cancel, cancelled, fork, select, take } from 'redux-saga/effects'
import selectCurrentSessionId from 'frontend/selectors/sessionId'
// import { hydrateSession } from '../actions'
import {
  SWITCH_TO_SESSION,
  USER_LOGGED_IN,
  USER_LOGGED_OUT
} from 'frontend/actions/types'
import type { Action } from 'frontend/actions/types'
import Session from 'frontend/firebase/session'

export function* subscribeToSession(sessionId: string): Saga<void> {
  // Create the session
  const session = new Session(sessionId)

  // Subscribe to changes in the channel
  const channel = eventChannel(emit => {
    // Emit on new data
    session.onSessionData(emit)

    // Return the cancellation
    return () => session.close()
  })

  try {
    while (true) {
      const sessionData = yield take(channel)
      console.log(sessionData)
      // yield put(hydrateSession(sessionData))
    }
  } finally {
    if (yield cancelled()) {
      channel.close()
    }
  }
}

export default function* loadCurrentSession(): Saga<void> {
  let currentSubscription = null
  let currentSessionId = null

  while (true) {
    const action: Action = yield take([
      USER_LOGGED_IN,
      SWITCH_TO_SESSION,
      USER_LOGGED_OUT
    ])

    // If the user is logging out, cancel any ongoing subscriptions and be done
    if (action.type === USER_LOGGED_OUT) {
      if (currentSubscription) {
        yield cancel(currentSubscription)
      }
      continue
    }

    // Find out what the target session id is
    let newSessionId = yield select(selectCurrentSessionId)
    if (action.type === SWITCH_TO_SESSION) {
      newSessionId = action.sessionId
    }

    // If the user has switched to a different session, change subscriptions
    const isNewSession = currentSessionId !== newSessionId
    if (isNewSession) {
      if (currentSubscription) {
        yield cancel(currentSubscription)
      }

      // Update state variables
      currentSubscription = yield fork(subscribeToSession, newSessionId)
      currentSessionId = newSessionId
    }
  }
}
