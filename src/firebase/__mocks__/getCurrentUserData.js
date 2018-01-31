// @flow
import type { UserDataState } from 'reducers/user/data'

const mockUserData: UserDataState = {
  sessions: [{ id: 'globalSession1' }, { id: 'globalSession2' }]
}

export default function getCurrentUserData(): Promise<?UserDataState> {
  return new Promise(resolve => {
    resolve(mockUserData)
  })
}
