// @flow
import React from 'react'
import styled from 'styled-components'
import logo from '!raw-loader!./logo.svg'

const Container = styled.div`
  svg {
    height: ${props => props.height};
    fill: currentColor;
  }
`

type Props = {
  height?: string
}
const Logo = (props: Props) => {
  const { height = '16px' } = props
  return (
    <Container height={height} dangerouslySetInnerHTML={{ __html: logo }} />
  )
}

export default Logo
