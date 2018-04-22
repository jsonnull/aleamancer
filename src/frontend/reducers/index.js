// @flow
import currentUser from './currentUser'
import preferences from './preferences'
import sidebar from './sidebar'
import ui from './ui'
import type { CurrentUserState } from './currentUser'
import type { PreferencesState } from './preferences'
import type { SidebarState } from './sidebar'
import type { UIState } from './ui'

type RouterState = {
  location: {
    pathname: string,
    search: string,
    hash: string
  }
}

export type ReducerState = {
  currentUser: CurrentUserState,
  preferences: PreferencesState,
  sidebar: SidebarState,
  ui: UIState,
  router: RouterState
}

export { currentUser, preferences, sidebar, ui }
