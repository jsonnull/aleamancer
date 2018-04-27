// @flow
import firebase from '@firebase/app'
import { userLoggedIn } from 'frontend/actions'
import { INITIAL_AUTH_FINISHED } from 'frontend/actions/types'

// Initiates Firebase auth and listen to auth state changes
const initialize = (config: Object, store: Object) => {
  firebase.initializeApp(config)

  let initialAuthFinished = false

  firebase.auth().onAuthStateChanged((user: ?Object) => {
    // Set the user's login state
    if (user) {
      store.dispatch(userLoggedIn(user.uid, user.email))
    }

    // This is the first confirmation that the user is logged-in or not
    if (initialAuthFinished == false) {
      store.dispatch({ type: INITIAL_AUTH_FINISHED })
      initialAuthFinished = true
    }
  })
}

export default initialize
