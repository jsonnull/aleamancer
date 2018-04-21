// @flow
import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import { Redirect, Route, Switch } from 'react-router'
import Header from 'frontend/containers/Header'
import Settings from 'frontend/containers/Settings'
import type { State } from 'frontend/store'
import * as themes from 'frontend/styles/themes'
import { CONSTS } from 'frontend/styles/common'
import Login from './Login'
import App from './App'
import Home from './Home'

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const Inner = styled.div`
  position: absolute;
  top: ${CONSTS.headerHeight};
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

type Props = {
  userIsLoggedIn: boolean,
  location: Object,
  theme: Object
}
class Entry extends React.Component<Props> {
  render() {
    const { userIsLoggedIn, theme } = this.props

    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Header />
          <Inner>
            <Switch>
              <Route
                exact
                path="/login"
                render={() =>
                  userIsLoggedIn ? <Redirect to="/sessions" /> : <Login />
                }
              />
              <Route exact path="/" component={Home} />
              <Route component={App} />
            </Switch>
          </Inner>
          <Settings />
        </Container>
      </ThemeProvider>
    )
  }
}

const mapStateToProps = (state: State): Props => ({
  userIsLoggedIn: state.ui.userIsLoggedIn,
  location: state.router.location,
  theme: themes[state.preferences.theme]
})

const Connected = connect(mapStateToProps)(Entry)

export default hot(module)(Connected)
