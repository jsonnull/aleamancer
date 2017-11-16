// @flow
import firebase from '@firebase/app'
import '@firebase/auth'
import type { UserProfileState } from 'reducers/user/profile'

const getCurrentUserProfile = (): UserProfileState => {
  const currentUser = firebase.auth().currentUser
  const photoURL = currentUser.photoURL
  const displayName = currentUser.displayName || currentUser.email

  const user = {
    displayName,
    photoURL
  }

  return user
}

export default getCurrentUserProfile
