// @flow
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { createMemoryHistory } from 'history'
import createSagaMiddleware from 'redux-saga'
import sinon from 'sinon'
import * as reducers from 'frontend/reducers'
import sagas from './sagas'

export const history = createMemoryHistory()

export const dispatchSpy = sinon.spy()

const spyReducer = (state = {}, action) => {
  dispatchSpy(action)
  return state
}

export default function createStoreWithMiddleware() {
  // $FlowFixMe: This is erroring for some reason
  const reducer = combineReducers({
    spyReducer,
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
