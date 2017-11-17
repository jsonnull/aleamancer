// @flow
import firebase from '@firebase/app'
import '@firebase/auth'
import type { UserProfileState } from 'reducers/user/profile'

type ProfileSaveState = {
  displayName: string
}

const saveProfile = (profile: UserProfileState): void => {
  firebase
    .auth()
    .currentUser.updateProfile(profile)
    .then(() => {})
    .catch(e => console.error(e))
}

export default saveProfile
