// @flow
import * as React from 'react'
import styled from 'styled-components'
import Header from 'frontend/containers/Header'
import Chat from 'frontend/containers/Chat'
import Map from 'frontend/containers/Map'
import Sidebar from 'frontend/containers/Sidebar'

const GameInner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  flex: 1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const Game = ({ match }: Object) => (
  <React.Fragment>
    <Header />
    <GameInner>
      <Sidebar match={match} />
      <Map />
      <Chat match={match} />
    </GameInner>
  </React.Fragment>
)

export default Game
