// @flow
import type { SessionSubscription } from '../types'

class Session implements SessionSubscription {
  constructor(sessionId: string) {}

  onSessionData(callback: Function) {
    callback({ data: null })
  }

  close() {}
}

const createSession = (sessionId: string) => new Session(sessionId)

export default createSession
