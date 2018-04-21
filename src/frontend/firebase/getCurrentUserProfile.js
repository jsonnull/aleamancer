// @flow
import firebase from '@firebase/app'
import '@firebase/auth'
import type { UserProfile } from 'common/types'

const getCurrentUserProfile = (): UserProfile => {
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
