// @flow
import firebase from '@firebase/app'
import '@firebase/auth'
import { PERFORM_USER_LOGIN } from 'frontend/actions/types'
import type { Action } from 'frontend/actions/types'

const loginWithEmailAndPassword = (action: Action) => {
  if (action.type !== PERFORM_USER_LOGIN) {
    return
  }

  firebase
    .auth()
    .signInWithEmailAndPassword(action.email, action.password)
    .catch(() => {
      console.log('there was an error')
    })
}

export default loginWithEmailAndPassword
