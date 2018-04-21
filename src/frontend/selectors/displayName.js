// @flow
import { createSelector } from 'reselect'
import currentUserSelector from './currentUser'

const displayNameSelector = createSelector(
  currentUserSelector,
  user => (user ? user.displayName : '')
)

export default displayNameSelector
