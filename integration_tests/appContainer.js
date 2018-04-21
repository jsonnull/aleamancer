// @flow
import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import setupStore, { history, dispatchSpy } from './store'
import client from './api'

type Props = {
  store: Object,
  children?: React.Element<*>
}
const App = (props: Props) => (
  <ApolloProvider client={client}>
    <Provider store={props.store}>
      <ConnectedRouter history={history}>{props.children}</ConnectedRouter>
    </Provider>
  </ApolloProvider>
)

export default App

export { setupStore, history, dispatchSpy }
