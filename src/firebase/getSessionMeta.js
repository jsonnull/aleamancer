// @flow
import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/firestore'

const loadSessionMeta = (sessionId: string): Promise<Object> =>
  new Promise((resolve, reject) => {
    const db = firebase.firestore()
    const sessions = db.collection('sessions')
    const session = sessions.doc(sessionId).get()
    session
      .then(doc => {
        if (doc.exists) {
          const { name } = doc.data()
          resolve({ name })
        } else {
          throw new Error('could not load session meta')
        }
      })
      .catch(reject)
  })

export default loadSessionMeta
