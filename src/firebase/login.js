// @flow
import firebase from '@firebase/app'
import '@firebase/auth'

type LoginAction = {
  type: 'PERFORM_USER_LOGIN',
  email: string,
  password: string
}

const loginWithEmailAndPassword = (action: LoginAction) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(action.email, action.password)
    .catch(error => {
      console.log('there was an error')
    })
}

export default loginWithEmailAndPassword
