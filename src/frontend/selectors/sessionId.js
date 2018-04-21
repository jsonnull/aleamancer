// @flow
import { createSelector } from 'reselect'
import type { State } from 'frontend/store'

// All sessions begin with `/g/` in the URL
const sessionPrefix = '/g/'

const pathnameSelector = (state: State) => state.router.location.pathname

const sessionIdSelector = createSelector(
  pathnameSelector,
  (location: string) => {
    if (location.indexOf(sessionPrefix) !== 0) {
      return null
    }

    const id = location.replace(sessionPrefix, '').split('/')

    if (id.length > 1) {
      return id[1]
    }

    return null
  }
)

export default sessionIdSelector
