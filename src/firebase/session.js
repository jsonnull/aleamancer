// @flow
import firebase from '@firebase/app'
import '@firebase/database'
import type { SessionSubscription, Ref } from './types'

class Session implements SessionSubscription {
  ref: Ref

  constructor(sessionId: string) {
    this.ref = firebase.database().ref(`sessions/${sessionId}`)
  }

  onSessionData(callback: Function) {
    this.ref.on('value', sessionSnapshot => {
      callback(sessionSnapshot.val())
    })
  }

  close() {
    this.ref.off()
  }
}

const createSession = (sessionId: string) => new Session(sessionId)

export default createSession
