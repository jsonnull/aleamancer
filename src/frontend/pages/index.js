// @flow
import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import { Route, Switch } from 'react-router'
import RequireUser from './utils/RequireUser'
import * as themes from 'frontend/styles/themes'
import { CONSTS } from 'frontend/styles/common'
import Header from 'frontend/containers/Header'
import Settings from 'frontend/containers/Settings'
import Sessions from 'frontend/containers/Sessions'
import Game from './Game'
import Home from './Home'
import Login from './Login'
import type { State } from 'frontend/store'

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
  theme: Object
}
class Entry extends React.Component<Props> {
  render() {
    const { theme } = this.props

    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Header />
          <Inner>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <RequireUser exact path="/sessions" component={Sessions} />
              <RequireUser exact path="/g/:name/:id" component={Game} />
            </Switch>
          </Inner>
          <Settings />
        </Container>
      </ThemeProvider>
    )
  }
}

const mapStateToProps = (state: State): Props => ({
  theme: themes[state.preferences.theme],
  // Next line is required so component updates when we dispatch a new location
  location: state.router.location
})

const Connected = connect(mapStateToProps)(Entry)

export default hot(module)(Connected)
