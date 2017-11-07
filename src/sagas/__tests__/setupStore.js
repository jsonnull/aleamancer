// @flow
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { createMemoryHistory } from 'history'
import createSagaMiddleware from 'redux-saga'
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

export default function createStoreWithMiddleware() {
  const reducers = combineReducers({
    messages,
    session,
    sidebar,
    ui,
    user,
    router: routerReducer
  })

  const sagaMiddleware = createSagaMiddleware()
  const middleware = [routerMiddleware(createMemoryHistory()), sagaMiddleware]

  let store = createStore(reducers, applyMiddleware(...middleware))

  sagaMiddleware.run(sagas)

  return store
}
