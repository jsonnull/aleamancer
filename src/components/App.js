// @flow
import React from 'react'
import { Switch, Route } from 'react-router'
import styled, { ThemeProvider } from 'styled-components'
import Loading from './Loading'
import Login from '../containers/Login'
import Header from '../containers/Header'
import Sessions from '../containers/Sessions'
import Settings from '../containers/Settings'
import Chat from '../containers/Chat'
import Map from '../containers/Map'
import Sidebar from '../containers/Sidebar'
import * as themes from 'styles/themes'
import { CONSTS } from 'styles/common'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: ${props => props.theme.map};
`

const GameInner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  flex: 1;
  position: absolute;
  top: ${CONSTS.headerHeight};
  right: 0;
  bottom: 0;
  left: 0;
`

const Game = () => (
  <GameInner>
    <Sidebar />
    <Map />
    <Chat />
  </GameInner>
)

export type Props = {
  appIsLoading: boolean,
  userIsLoggedIn: boolean,
  showSettings: boolean,
  location: Object,
  theme: Object
}
class App extends React.Component<Props> {
  render() {
    const { appIsLoading, userIsLoggedIn, showSettings, theme } = this.props

    if (appIsLoading) {
      return (
        <ThemeProvider theme={themes['light']}>
          <Loading />
        </ThemeProvider>
      )
    }

    if (!userIsLoggedIn) {
      return (
        <ThemeProvider theme={themes['light']}>
          <Login />
        </ThemeProvider>
      )
    }

    const settings = showSettings ? <Settings /> : null

    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Header />
          <Switch>
            <Route exact path="/" component={Sessions} />
            <Route path="/g/:id/" component={Game} />
          </Switch>
          {settings}
        </Container>
      </ThemeProvider>
    )
  }
}

export default App
