// @flow
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import * as reducers from './reducers'
import type { ReducerState } from './reducers'
import sagas from './sagas/'

/* State tree */
export type State = ReducerState

export default function createStoreWithMiddleware(history: Object) {
  const reducer = combineReducers({
    ...reducers,
    router: routerReducer
  })

  const sagaMiddleware = createSagaMiddleware()
  const middleware = [routerMiddleware(history), sagaMiddleware]

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  let store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(...middleware))
  )

  sagaMiddleware.run(sagas)

  return store
}
