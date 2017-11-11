// @flow
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import createBrowserHistory from 'history/createBrowserHistory'
import { ConnectedRouter } from 'react-router-redux'
import initializeFirebase from './firebase/initialize'
import App from './containers/App'
import createStore from './store'
import './assets'

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyDJ-PsA14e45zCy8cGOCMN7a0R2fmoYmi8',
  authDomain: 'avaland-db534.firebaseapp.com',
  databaseURL: 'https://avaland-db534.firebaseio.com',
  storageBucket: 'avaland-db534.appspot.com',
  messagingSenderId: '120753444769'
}

let history = createBrowserHistory()
let store = createStore(history)
initializeFirebase(config, store)

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Component />
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    ((document.getElementById('root'): any): Element)
  )
}

render(App)

if (module.hot) {
  ;(module.hot: any).accept('containers/App', () => {
    render(App)
  })
}
