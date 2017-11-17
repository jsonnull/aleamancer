// @flow
import firebase from '@firebase/app'
import '@firebase/auth'

const getCurrentUserEmail = (): string => {
  return firebase.auth().currentUser.email
}

export default getCurrentUserEmail
