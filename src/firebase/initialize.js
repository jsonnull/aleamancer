// @flow
import firebase from '@firebase/app'

// Initiates Firebase auth and listen to auth state changes
const initialize = (config: Object, store: Object) => {
  firebase.initializeApp(config)

  firebase.auth().onAuthStateChanged((user: ?Object) => {
    if (user) {
      store.dispatch({ type: 'USER_LOGGED_IN' })
    } else {
      store.dispatch({ type: 'APP_FINISHED_LOADING' })
    }
  })
}

export default initialize
