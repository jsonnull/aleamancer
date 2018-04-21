// @flow
import React from 'react'
import styled, { keyframes } from 'styled-components'
import Logo from '../Logo'
import spinner from './spinner.svg'

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

const Loading = styled.div`
  width: 300px;
  background: ${props => props.theme.background};
  border-radius: 5px;
  padding: 2rem;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  align-self: center;
  margin: auto;
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  text-align: center;
  margin: 0;
  margin-bottom: 1rem;
`

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Spinner = styled.img.attrs({
  src: spinner
})`
  animation: ${spin} 1.4s infinite linear;
  transform: translateZ(0);
  margin: 1rem auto 0;
  width: 80px;
  height: 80px;
`

const LoadingModal = () => (
  <Container>
    <Loading>
      <Title>
        <Logo height="25px" />
      </Title>
      <Spinner />
    </Loading>
  </Container>
)

export default LoadingModal
