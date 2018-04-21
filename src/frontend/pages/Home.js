// @flow
import React from 'react'
import styled from 'styled-components'
import { light as theme } from '../styles/themes'
import { colors } from 'frontend/styles/common'
import Logo from 'frontend/components/Logo'

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: ${colors.blue};
  color: ${theme.background};
  display: flex;
`

const Item = styled.div`
  margin: auto;
  text-align: center;
`

const Home = () => {
  return (
    <Container>
      <Item>
        <Logo height={'40px'} />
      </Item>
    </Container>
  )
}

export default Home
