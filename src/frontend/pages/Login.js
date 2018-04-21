// @flow
import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { compose, withHandlers, withState } from 'recompose'
import { performUserLogin } from 'frontend/actions'
import { fonts } from 'frontend/styles/common'
import Logo from 'frontend/components/Logo'

type Props = {
  email: string,
  password: string,
  onEmailChange: Function,
  onPasswordChange: Function,
  onLogin: Function
}

const Dialog = styled.div`
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

export const Login = (props: Props) => {
  return (
    <Dialog>
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
    </Dialog>
  )
}

const enhance = compose(
  connect(null, (dispatch: Function) => ({
    login: (email: string, password: string) =>
      dispatch(performUserLogin(email, password))
  })),
  withState('email', 'setEmail', ''),
  withState('password', 'setPassword', ''),
  withHandlers({
    onEmailChange: ({ setEmail }) => (e: Object) => setEmail(e.target.value),
    onPasswordChange: ({ setPassword }) => (e: Object) =>
      setPassword(e.target.value),
    onLogin: ({ login, email, password, setPassword }) => (e: Object) => {
      e.preventDefault()
      e.stopPropagation()

      login(email, password)
      setPassword('')
    }
  })
)

export default enhance(Login)
