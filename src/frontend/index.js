// @flow
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import createBrowserHistory from 'history/createBrowserHistory'
import { ConnectedRouter } from 'react-router-redux'
import initializeFirebase from 'frontend/firebase/initialize'
import Pages from 'frontend/pages'
import createStore from 'frontend/store'
import client from 'api/index'
import 'frontend/assets'

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyDJ-PsA14e45zCy8cGOCMN7a0R2fmoYmi8',
  authDomain: 'avaland-db534.firebaseapp.com',
  databaseURL: 'https://avaland-db534.firebaseio.com',
  projectId: 'avaland-db534',
  storageBucket: 'avaland-db534.appspot.com',
  messagingSenderId: '120753444769'
}

let history = createBrowserHistory()
let store = createStore(history)
initializeFirebase(config, store)

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Pages />
      </ConnectedRouter>
    </Provider>
  </ApolloProvider>,
  ((document.getElementById('root'): any): Element)
)
