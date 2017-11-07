// @flow
import firebase from '@firebase/app'
import '@firebase/auth'

const logoutCurrentUser = () => {
  firebase
    .auth()
    .signOut()
    .catch(error => {
      console.error(error)
    })
}

export default logoutCurrentUser
