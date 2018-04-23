// @flow
import React from 'react'
import styled from 'styled-components'
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
  <GameInner>
    <Sidebar />
    <Map />
    <Chat match={match} />
  </GameInner>
)

export default Game
