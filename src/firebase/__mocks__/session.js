// @flow
import type { SessionSubscription } from '../types'

export default class Session implements SessionSubscription {
  /*eslint-disable no-unused-vars*/
  constructor(sessionId: string) {}
  /*eslint-enable no-unused-vars*/

  onSessionData(callback: Function) {
    callback({ data: null })
  }

  close() {}
}
