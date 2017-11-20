// @flow
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { createMemoryHistory } from 'history'
import createSagaMiddleware from 'redux-saga'
import sinon from 'sinon'
import messages from 'reducers/messages'
import session from 'reducers/session'
import sidebar from 'reducers/sidebar'
import ui from 'reducers/ui'
import user from 'reducers/user/'
import sagas from './setupSagas'

import type { MessagesState } from 'reducers/messages'
import type { SessionState } from 'reducers/session'
import type { SidebarState } from 'reducers/sidebar'
import type { UIState } from 'reducers/ui'
import type { UserState } from 'reducers/user'

type RouterState = {
  location: {
    pathname: string,
    search: string,
    hash: string
  }
}

/* State tree */
type State = {
  messages: MessagesState,
  session: SessionState,
  sidebar: SidebarState,
  ui: UIState,
  user: UserState,
  router: RouterState
}

export const history = createMemoryHistory()

export const dispatchSpy = sinon.spy()

const spyReducer = (state = {}, action) => {
  dispatchSpy(action)
  return state
}

export default function createStoreWithMiddleware() {
  const reducers = combineReducers({
    spyReducer,
    messages,
    session,
    sidebar,
    ui,
    user,
    router: routerReducer
  })

  const sagaMiddleware = createSagaMiddleware()
  const middleware = [routerMiddleware(history), sagaMiddleware]

  let store = createStore(reducers, applyMiddleware(...middleware))

  sagaMiddleware.run(sagas)

  return store
}
