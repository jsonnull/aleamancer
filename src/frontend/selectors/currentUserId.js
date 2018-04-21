// @flow
import type { State } from 'frontend/store'

const userIdSelector = (state: State) => state.currentUser.id

export default userIdSelector
