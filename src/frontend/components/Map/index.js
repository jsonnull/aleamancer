// @flow
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background-color: ${props => props.theme.map};
  box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.2);
  flex: 1;
`

type Props = {}
class Map extends React.Component<Props> {
  render() {
    return <Container />
  }
}

export default Map
