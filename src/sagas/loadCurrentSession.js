// @flow
import { eventChannel } from 'redux-saga'
import { take, put, select, fork, cancel, cancelled } from 'redux-saga/effects'
import selectCurrentSessionId from 'selectors/sessionId'
import { hydrateSession } from 'actions'
import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  SWITCH_TO_SESSION
} from 'actions/types'
import type { Action } from 'actions/types'
import type { SessionSubscription } from 'firebase/types'

function* subscribeToSession(
  session: SessionSubscription
): Generator<Object, *, *> {
  const channel = eventChannel(emit => {
    // Emit on new data
    session.onSessionData(emit)

    // Return the cancellation
    return () => session.close()
  })

  try {
    while (true) {
      const sessionData = yield take(channel)
      yield put(hydrateSession(sessionData))
    }
  } finally {
    if (yield cancelled()) {
      channel.close()
    }
  }
}

type CreateSessionFunction = (sessionId: string) => SessionSubscription

export default function* loadCurrentSession(
  createSession: CreateSessionFunction
): Generator<*, *, *> {
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

      currentSessionId = newSessionId
      currentSubscription = yield fork(
        subscribeToSession,
        createSession(newSessionId)
      )
    }
  }
}
