// @flow
import currentUser from './currentUser'
import messages from './messages'
import preferences from './preferences'
import sessions from './sessions'
import sidebar from './sidebar'
import ui from './ui'
import type { CurrentUserState } from './currentUser'
import type { MessagesState } from './messages'
import type { PreferencesState } from './preferences'
import type { SessionsState } from './sessions'
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
  messages: MessagesState,
  preferences: PreferencesState,
  sessions: SessionsState,
  sidebar: SidebarState,
  ui: UIState,
  router: RouterState
}

export { currentUser, messages, preferences, sessions, sidebar, ui }
