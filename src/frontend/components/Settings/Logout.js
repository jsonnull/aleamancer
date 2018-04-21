// @flow
import React from 'react'
import styled from 'styled-components'
import Button from '../Button'

type Props = {
  logout: Function
}

const Container = styled.div`
  margin-top: 2rem;
  display: flex;
`

const Logout = (props: Props) => {
  return (
    <Container>
      <Button red onClick={props.logout}>
        Logout
      </Button>
    </Container>
  )
}

export default Logout
