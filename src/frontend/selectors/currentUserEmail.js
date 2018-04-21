// @flow
import type { State } from 'frontend/store'

const userEmailSelector = (state: State) => state.currentUser.email

export default userEmailSelector
