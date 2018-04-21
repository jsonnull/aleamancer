// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'

const Login = () => (
  <Link to="/login" style={{ textDecoration: 'none' }}>
    <Button>Login</Button>
  </Link>
)

export default Login
