// @flow
import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'

const loadSessionMeta = (sessionId: string): Promise<Object> =>
  new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(`sessions/${sessionId}/name`)
      .once('value')
      .then(response =>
        resolve({
          name: response.val()
        })
      )
      .catch(reject)
  })

export default loadSessionMeta
