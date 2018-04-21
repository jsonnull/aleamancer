// @flow
import firebase from '@firebase/app'
import '@firebase/auth'
import type { UserProfile } from 'common/types'

const saveProfile = (profile: UserProfile): void => {
  firebase
    .auth()
    .currentUser.updateProfile(profile)
    .then(() => {})
    .catch(e => console.error(e))
}

export default saveProfile
