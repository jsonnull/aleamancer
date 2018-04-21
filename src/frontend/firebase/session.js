// @flow
import firebase from '@firebase/app'
import '@firebase/database'
import type { Ref, SessionSubscription } from 'frontend/firebase/types'

export default class Session implements SessionSubscription {
  ref: Ref

  constructor(sessionId: string) {
    this.ref = firebase.database().ref(`sessions/${sessionId}`)
  }

  onSessionData(callback: Function) {
    this.ref.on('value', sessionSnapshot => {
      const val = sessionSnapshot.val()
      if (val) {
        callback(val)
      }
    })
  }

  close() {
    this.ref.off()
  }
}
