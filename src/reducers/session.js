// @flow
import * as types from '../actions/types'
import type { Action } from '../actions/types'

export type SessionState = {
  [key: string]: string
}

const initialState = {
  name: ''
}

export default function reducer(
  state: SessionState = initialState,
  action: Action
) {
  switch (action.type) {
    case types.HYDRATE_SESSION:
      return { ...state, ...action.session }
    default:
      return state
  }
}
