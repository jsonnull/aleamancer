// @flow
import { normalizeUserData } from '../getCurrentUserData'
import type { FirebaseUserData } from '../types'
import type { UserDataState } from 'reducers/user/data'

describe('normalize user data utility', () => {
  it('should transform firebase value into correct state', () => {
    const firebaseData: FirebaseUserData = {
      sessions: {
        userSession1: 'globalSession1',
        userSession2: 'globalSession2'
      }
    }

    const userData: UserDataState = {
      userSessions: {
        userSession1: { sessionId: 'globalSession1' },
        userSession2: { sessionId: 'globalSession2' }
      }
    }

    expect(normalizeUserData(firebaseData)).toEqual(userData)
  })
})
