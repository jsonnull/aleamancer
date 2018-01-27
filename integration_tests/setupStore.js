// @flow
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { createMemoryHistory } from 'history'
import { createReducer } from 'redux-orm'
import createSagaMiddleware from 'redux-saga'
import sinon from 'sinon'
import orm from '../src/models/orm'
import * as reducers from '../src/reducers'
import sagas from './setupSagas'

export const history = createMemoryHistory()

export const dispatchSpy = sinon.spy()

const spyReducer = (state = {}, action) => {
  dispatchSpy(action)
  return state
}

export default function createStoreWithMiddleware() {
  const reducer = combineReducers({
    spyReducer,
    orm: createReducer(orm),
    ...reducers,
    router: routerReducer
  })

  const sagaMiddleware = createSagaMiddleware()
  const middleware = [routerMiddleware(history), sagaMiddleware]

  // $FlowFixMe: This is erroring for some reason
  let store = createStore(reducer, applyMiddleware(...middleware))

  sagaMiddleware.run(sagas)

  return store
}
