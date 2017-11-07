// @flow
import * as types from 'actions/types'
import type { Action } from '../../actions/types'
import type { ThemeName } from 'types'

export type UserPreferencesState = {
  theme: ThemeName,
  chatPinned: boolean
}

const initialState = {
  theme: 'light',
  chatPinned: false
}

export default function reducer(
  state: UserPreferencesState = initialState,
  action: Action
) {
  switch (action.type) {
    case types.CHANGE_THEME:
      return { ...state, theme: action.theme }
    case types.TOGGLE_CHAT_PIN:
      return { ...state, chatPinned: !state.chatPinned }
    case types.HYDRATE_PREFERENCES:
      const { theme, chatPinned } = action.prefs
      return { ...state, theme, chatPinned }
    default:
      return state
  }
}
