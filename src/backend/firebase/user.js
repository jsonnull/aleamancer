/* @flow */
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import SessionManager from './session'
import type { State } from 'store'
import type { SessionMeta } from 'types'
import type { UserDataState } from 'reducers/user/data'
import {
  hydrateUserData,
  hydratePreferences,
  hydrateUserProfile,
  hydrateSessionMeta,
  changeSidebarTab
} from 'actions'

export default class UserManager {
  store: Object
  userDataRef: Object

  constructor (store: Object) {
    this.store = store
    const uid = firebase.auth().currentUser.uid
    this.userDataRef = firebase.database().ref(`users/${uid}`)
    this.loadPreferences()
    this.loadProfile()
  }

  static async init (store: Object): Promise<UserManager> {
    let instance = new UserManager(store)

    // Watches data and returns when initial data set is retrieved
    await instance.loadData()

    instance.loadSessionInfo()

    return instance
  }

  loadPreferences () {
    const hydrate = prefs => this.store.dispatch(hydratePreferences(prefs))
    const uid = firebase.auth().currentUser.uid
    firebase.database().ref(`prefs/${uid}`).once('value')
      .then(prefs => hydrate(prefs.val()))
      .catch(e => console.error(e))
  }

  savePreferences () {
    const uid = firebase.auth().currentUser.uid
    const state: State = this.store.getState()
    firebase.database().ref(`prefs/${uid}`)
      .set(state.user.preferences)
      .then(() => {})
      .catch(e => console.error(e))
  }

  loadProfile () {
    const currentUser = firebase.auth().currentUser
    const photoURL = currentUser.photoURL
    const displayName = currentUser.displayName || currentUser.email

    let user = {
      displayName,
      photoURL
    }

    this.store.dispatch(hydrateUserProfile(user))
  }

  // FIXME: user object
  saveProfile (user: Object) {
    firebase.auth().currentUser
      .updateProfile({
        displayName: user.displayName
      })
      .then(() => {})
      .catch(e => console.error(e))
  }

  async loadData (): Promise<?UserDataState> {
    const hydrate = data => this.store.dispatch(hydrateUserData(data))

    // Make sure we remove all previous listeners
    this.userDataRef.off()

    let userData = await new Promise(resolve => {
      this.userDataRef.on('value', user => {
        let normalizedData: ?UserDataState = this.normalizeUserData(user.val())
        if (normalizedData) {
          hydrate(normalizedData)
        }
        resolve(normalizedData)
      })
    })

    return userData
  }

  normalizeUserData (userData: ?Object): ?Object {
    if (!userData) {
      return null
    }

    const { currentSession, sessions } = userData

    for (let key in sessions) {
      if (sessions.hasOwnProperty(key)) {
        const sessionId = sessions[key]
        sessions[key] = { sessionId }
      }
    }

    return {
      currentSession,
      userSessions: sessions
    }
  }

  // Add a session to a user's profile
  addSession (sessionId: string) {
    const goToSessionTab = () => this.store.dispatch(changeSidebarTab('Session'))
    const uid = firebase.auth().currentUser.uid

    let userSessionId = firebase.database().ref(`users/${uid}/sessions`).push().key
    let updates = {}
    updates[`users/${uid}/currentSession`] = sessionId
    updates[`users/${uid}/sessions/${userSessionId}`] = sessionId

    firebase.database().ref().update(updates)
      .then(goToSessionTab)
      .catch(e => console.error(e))
  }

  setSession (sessionId: string) {
    const uid = firebase.auth().currentUser.uid

    let updates = {}
    updates[`users/${uid}/currentSession`] = sessionId

    firebase.database().ref().update(updates)
      .then(() => {})
      .catch(e => console.error(e))
  }

  async loadSessionInfo () {
    const state: State = this.store.getState()
    const sessions = state.user.data.userSessions

    const store = this.store
    async function getSessionMeta (userSessionId: string, sessionId: string) {
      const meta: SessionMeta = await SessionManager.getSessionInfo(sessionId)
      store.dispatch(hydrateSessionMeta(userSessionId, meta))
    }

    await Promise.all([
      ...Object.keys(sessions).map(key => getSessionMeta(key, sessions[key].sessionId))
    ])
  }
}
