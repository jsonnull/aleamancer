// @flow
import * as types from 'frontend/actions/types'
import type { Action } from 'frontend/actions/types'
import type { Tab } from 'common/types'

export type SidebarState = {
  open: boolean,
  tab: Tab
}

const initialState = {
  open: true,
  tab: 'Session'
}

declare var type: string

export default function reducer(
  state: SidebarState = initialState,
  action: Action
) {
  switch (action.type) {
    case types.CHANGE_SIDEBAR_TAB:
      return { ...state, tab: action.tab }
    default:
      return state
  }
}
