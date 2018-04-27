// @flow
import firebase from '@firebase/app'
import '@firebase/firestore'
import '@firebase/auth'

const setChatPinned = async (
  _: any,
  { isPinned }: { isPinned: boolean },
  _ctx: any
) => {
  const uid = firebase.auth().currentUser.uid

  const preferenceDoc = firebase
    .firestore()
    .collection('preferences')
    .doc(uid)

  await preferenceDoc.set({ chatPinned: isPinned }, { merge: true })

  const result = await preferenceDoc.get()

  if (!result.exists) {
    throw new Error('After writing preferences, doc does not exist.')
  }

  return {
    id: result.id,
    ...result.data()
  }
}

export default setChatPinned
