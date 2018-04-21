// @flow
import type { State } from 'frontend/store'

const currentUserSelector = (state: State) => {
  return state.currentUser
}

export default currentUserSelector
