// @flow
import React from 'react'
import styled from 'styled-components'
import Logo from './Logo'
import { fonts } from 'styles/common'

type Props = {
  email: string,
  password: string,
  onEmailChange: Function,
  onPasswordChange: Function,
  onLogin: Function
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const Login = styled.div`
  width: 300px;
  align-self: center;
  margin: auto;
  background: ${props => props.theme.background};
  border-radius: 5px;
  padding: 2rem;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
`

const Heading = styled.h1`
  font-family: ${fonts.heading};
  text-align: center;
  margin: 0;
  margin-bottom: 1rem;
  line-height: 3rem;
`

// FIXME: Extend input element
const Input = styled.input`
  border-radius: 0;
  background: none;
  border: none;
  padding: 0;
  border-bottom: 1px solid ${props => props.theme.borderColor};
  width: 100%;
  margin-bottom: 1rem;
`

// FIXME: Extend button element
const Button = styled.button`
  display: block;
  position: relative;
  margin: 0 auto 0;
`

export default (props: Props) => {
  return (
    <Container>
      <Login>
        <Heading>
          <Logo height="25px" />
        </Heading>
        <form onSubmit={props.onLogin}>
          <Input
            name="username"
            type="text"
            placeholder="email"
            value={props.email}
            onChange={props.onEmailChange}
          />
          <Input
            name="password"
            type="password"
            placeholder="password"
            value={props.password}
            onChange={props.onPasswordChange}
          />
          <Button onClick={props.onLogin}>Login</Button>
        </form>
      </Login>
    </Container>
  )
}
